import { LitElement, html, unsafeCSS } from "lit";
import type { TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles from "../styles/components/notification.scss?inline";
import "./icon.ts";
import "./button.ts";

/** 通知类型（语义色） */
export type NotificationType = "info" | "success" | "warning" | "error";

/** 通知弹出位置 */
export type NotificationPosition =
  | "top"
  | "topLeft"
  | "topRight"
  | "bottom"
  | "bottomLeft"
  | "bottomRight";

/** 通知视觉变体 */
export type NotificationVariant = "normal" | "soft";

/** 进度条分档颜色节点（百分比与剩余时间占比对齐） */
export type ProgressColorStop = { color: string; percentage: number };

/** 进度条颜色：单个颜色，或按百分比分档的颜色数组 */
export type ProgressColor = string | ProgressColorStop[];

/** 进度条配置：boolean 开关，或对象（color / position） */
export type ProgressOption = boolean | { color?: ProgressColor; position?: "top" | "bottom" };

/**
 * 通知选项（创建时传入）
 * 注意：`id` 仅创建时生效，`update()` 的 options 不含该字段
 */
export interface NotificationOptions {
  /** 自定义通知 id；不传则由管理器自动生成。与现存 id 重复时抛错 */
  id?: string;
  /** 通知标题 */
  title?: string;
  /** 通知正文：纯文本 / DOM 节点（零 lit 依赖）/ lit 模板 */
  content?: string | Node | TemplateResult;
  /** 通知类型，自动设置图标和颜色 */
  type?: NotificationType;
  /** 自定义强调色，覆盖 `type` 默认配色（语义同按钮 `color`） */
  color?: string;
  /** 视觉变体：normal（普通）/ soft（多彩） */
  variant?: NotificationVariant;
  /** 自动关闭延时（毫秒）；0 表示不自动关闭 */
  duration?: number;
  /** 弹出位置 */
  position?: NotificationPosition;
  /** 自定义图标（Iconify `prefix:name`）；`false` 显式隐藏，`''` 用 type 默认 */
  icon?: string | false;
  /** 是否显示关闭按钮 */
  showClose?: boolean;
  /** 进度条：默认开启；`false` 关闭；对象可自定义颜色与位置 */
  progress?: ProgressOption;
  /** hover 时是否暂停自动关闭计时器与进度条 */
  pauseOnHover?: boolean;
  /** 通知的 z-index */
  zIndex?: number;
  /** 点击通知体的回调 */
  onClick?: () => void;
  /** 通知关闭时的回调（自动关闭和手动关闭都会触发） */
  onClose?: () => void;
}

/** 全局默认配置 */
export interface NotificationGlobalConfig {
  /* 延迟关闭时长（毫秒） */
  duration: number;
  /* 通知的 z-index，在被覆盖的情况下可以调整 */
  zIndex: number;
  /* 通知弹出位置 */
  position: NotificationPosition;
  /** 通知弹出位置偏移量 */
  top: string;
  bottom: string;
  left: string;
  right: string;
  /** 默认视觉变体 */
  variant: NotificationVariant;
  /** 默认是否显示关闭按钮 */
  showClose: boolean;
  /** 默认是否显示进度条 */
  progress: boolean;
  /** 默认 hover 是否暂停自动关闭计时器与进度条 */
  pauseOnHover: boolean;
  /** 各 type 的全局默认图标映射（不配置时用内建表） */
  icon: Record<NotificationType, string>;
}

/**
 * config() 的入参：除 `icon` 为可选对象（允许只覆盖部分 type）外，其余字段均可整体覆盖
 */
export type NotificationGlobalConfigInput = Partial<
  Omit<NotificationGlobalConfig, "icon"> & { icon?: Partial<Record<NotificationType, string>> }
>;

/** 通知运行时快照（只读，供 get/getAll 查询，不含实例引用） */
export interface NotificationSnapshot {
  /** 通知 id */
  id: string;
  /** 通知标题（未传时为空字符串 ""） */
  title: string;
  /** 自动关闭延时（ms）；0 表示不自动关闭 */
  duration: number;
  /** 剩余毫秒（倒计时），取值时刻的采样值，非实时 */
  remaining: number;
  /** 弹出位置 */
  position: NotificationPosition;
}

// 常量

/** 各 type 的默认图标 */
const TYPE_DEFAULT_ICONS: Record<NotificationType, string> = {
  info: "material-symbols:info-rounded",
  success: "material-symbols:check-circle-rounded",
  warning: "material-symbols:warning-rounded",
  error: "material-symbols:error-rounded",
};

/** 顶部位置集合（容器垂直方向与底部位置相反） */
const TOP_POSITIONS = new Set<NotificationPosition>(["top", "topLeft", "topRight"]);

// <dv-notification> 卡片组件

/**
 * NotificationCard 通知卡片（单条通知）
 *
 * 设计上作为 `Notification` 的渲染单元，
 * 也导出以便单独预览、测试与二次组合。
 * 自身只负责静态渲染与事件派发；倒计时 / 进度条刷新等动态行为由管理器注入。
 */
@customElement("dv-notification")
export class NotificationCard extends LitElement {
  /**
   * 通知类型（语义色）。
   * 不设置（''）时：无图标（除非显式传 icon）、强调色使用第三色（tertiary）
   */
  @property({ type: String })
  type: NotificationType | "" = "";

  /** 自定义强调色，覆盖 `type` 默认配色 */
  @property({ type: String })
  color = "";

  /** 视觉变体：normal（普通）/ soft（多彩） */
  @property({ type: String })
  variant: NotificationVariant = "normal";

  /** 通知标题 */
  @property({ type: String })
  title = "";

  /** 通知正文：纯文本 / DOM 节点 / lit 模板 */
  @property({ type: Object, attribute: false })
  content: string | Node | TemplateResult = "";

  /** 自定义图标；`false` 显式隐藏，`''` 用 type 默认 */
  @property({ type: Object, attribute: false })
  icon: string | false = "";

  /** 是否显示关闭按钮 */
  @property({ type: Boolean })
  showClose = true;

  /** 是否显示进度条（duration 为 0 时由管理器降级为 false） */
  @property({ type: Boolean })
  progress = true;

  /** 管理器赋予的唯一 id，随 dv-close / dv-click 事件带回 */
  @property({ type: String, attribute: "notification-id" })
  notificationId = "";

  /** 内部状态：动画阶段（'' 未开始 / 'show' 进入 / 'hide' 退出）。@state 驱动重渲染以切换动画 class */
  @state()
  private _animation: "" | "show" | "hide" = "";

  /** 组件样式（通过 Vite ?inline 编译为纯 CSS 字符串） */
  static styles = unsafeCSS(styles);

  /**
   * 首次渲染后触发进入动画（show）
   * 静态使用（stories / 文档）时同样会播放进入动画，行为一致。
   */
  protected override firstUpdated(): void {
    this._animation = "show";
  }

  /**
   * 开始退出动画，动画结束后派发 `dv-close`
   * 幂等：已在退出中则直接返回
   */
  startExit(): void {
    if (this._animation === "hide") return;
    this._animation = "hide";
    this.shadowRoot?.addEventListener("animationend", this._onExitAnimationEnd);
  }

  /**
   * 退出动画结束：确认是退出动画后派发 dv-close（携带 id）
   * @param e - 原生动画结束事件
   */
  private _onExitAnimationEnd = (e: Event): void => {
    const anim = e as AnimationEvent;
    if (!anim.animationName.startsWith("dockv-notif-exit-")) return;
    this.shadowRoot?.removeEventListener("animationend", this._onExitAnimationEnd);
    this.dispatchEvent(
      new CustomEvent("dv-close", {
        bubbles: true,
        composed: true,
        detail: { id: this.notificationId },
      }),
    );
  };

  /** 点击通知体：派发 dv-click（携带 id） */
  private _handleClick = (): void => {
    this.dispatchEvent(
      new CustomEvent("dv-click", {
        bubbles: true,
        composed: true,
        detail: { id: this.notificationId },
      }),
    );
  };

  /** 点击关闭按钮：走退出动画 */
  private _handleCloseBtn = (): void => {
    this.startExit();
  };

  /**
   * 计算内联样式：`color` 非空时注入强调色变量，
   * 覆盖 type 默认强调色并派生 soft 背景/边框（与按钮 `color` 同一套 color-mix 思路）
   * @returns CSS style 属性值
   */
  private _getInlineStyle(): string {
    const parts: string[] = [];
    if (this.color) {
      parts.push(`--dockv-notification-accent-color: ${this.color}`);
      parts.push(
        `--dockv-notification-soft-bg-color: color-mix(in srgb, ${this.color} 10%, var(--dockv-color-bg-3))`,
      );
      parts.push(`--dockv-notification-soft-border-color: ${this.color}`);
    }
    return parts.join(";");
  }

  /**
   * 渲染方法
   * @returns Lit 模板结果
   */
  protected override render() {
    // 图标解析优先级：显式 icon > 全局图标映射 > 内建默认（type 对应）
    // false 显式隐藏；'' 且未设 type 时无图标；'' 且有 type 时用全局 type 默认图标
    const iconName =
      this.icon === false ? "" : this.icon || (this.type ? globalConfig.icon[this.type] : "");
    const iconEl = iconName
      ? html`<div class="dockv-notification-icon">
          <dv-icon icon=${iconName} size="24px"></dv-icon>
        </div>`
      : "";

    const titleEl = this.title
      ? html`<div class="dockv-notification-title">${this.title}</div>`
      : "";

    const contentEl =
      this.content !== "" && this.content != null
        ? html`<div class="dockv-notification-content">${this.content}</div>`
        : "";

    const closeEl = this.showClose
      ? html`<div class="dockv-notification-close">
          <dv-button
            type="tertiary"
            variant="ghost"
            size="xs"
            square
            icon="material-symbols:close"
            @dv-click=${this._handleCloseBtn}></dv-button>
        </div>`
      : "";

    // 进度条由管理器通过 CSS 变量驱动（宽度 / 颜色 / 位置），自身不内建动画
    const progressEl = this.progress
      ? html`<div class="dockv-notification-progress" part="progress"></div>`
      : "";

    const animClass = this._animation ? `dockv-notification-${this._animation}` : "";
    // type 为空时不输出 type class（无强调色覆盖，走卡片默认 tertiary）
    const typeClass = this.type ? `dockv-notification-type-${this.type}` : "";

    return html`
      <div
        class="dockv-notification-card dockv-notification-${this.variant} ${typeClass} ${animClass}"
        style=${this._getInlineStyle()}
        @click=${this._handleClick}>
        ${iconEl}
        <div class="dockv-notification-body">${titleEl} ${contentEl}</div>
        ${closeEl} ${progressEl}
      </div>
    `;
  }

  /**
   * 从 DOM 断开时通知管理器清理对应实例的定时器（幂等）
   * 兜底：外部直接 removeChild 时避免定时器泄漏
   */
  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    Notification._handleCardDisconnected(this);
  }
}

// Notification 管理器

/** 通知实例内部状态 */
interface NotificationInstance {
  id: string;
  element: NotificationCard;
  duration: number;
  /** 剩余毫秒（倒计时） */
  remaining: number;
  /** 上一次 tick 时间戳（performance.now） */
  lastTick: number;
  /** rAF 帧 id（倒计时与进度条刷新共用） */
  timer: number | null;
  /** hover 中（配合 pauseOnHover 暂停倒计时） */
  hovering: boolean;
  pauseOnHover: boolean;
  /** 进度条原始配置（update 时重置 duration 需要重放） */
  progress: ProgressOption;
  /** 进度条颜色（string 或分档数组） */
  progressColor: ProgressColor | undefined;
  onClick?: () => void;
  onClose?: () => void;
  /** 退出中标记（防止重复触发退出流程） */
  closing: boolean;
}

let idCounter = 0;

/** 各 position 的容器 */
const containers = new Map<NotificationPosition, HTMLElement>();

/** 已存在的通知实例 */
const instances = new Map<string, NotificationInstance>();

/** 全局默认配置 */
let globalConfig: NotificationGlobalConfig = {
  duration: 3000,
  position: "topRight",
  zIndex: 1010,
  top: "24px",
  bottom: "24px",
  left: "24px",
  right: "24px",
  variant: "normal",
  showClose: true,
  progress: true,
  pauseOnHover: true,
  // 初始为内建图标表的副本，config() 可整体或按 type 覆盖
  icon: { ...TYPE_DEFAULT_ICONS },
};

/**
 * 生成唯一 id：自增 + 随机短片段，降低与用户自定义固定 id 撞车的概率
 * @returns 形如 `dockv-notification-1-<6位随机>` 的 id
 */
function generateId(): string {
  let id: string;
  do {
    idCounter++;
    // 自增保留可读性/排序可预期；随机片段使自动 id 不可猜测（几乎不会与用户自定义 id 重合）
    const rand = Math.random().toString(36).slice(2, 8);
    id = `dockv-notification-${idCounter}-${rand}`;
  } while (instances.has(id)); // 兜底：即便极端重合也重滚
  return id;
}

/**
 * 由实例构建只读快照
 * 注意：title 存在卡片元素（element）上，position 写在 element 的 data-position 属性上，
 * 均非 instance 自带字段，须从 element 读取
 * @param inst - 通知实例
 */
function buildSnapshot(inst: NotificationInstance): NotificationSnapshot {
  return {
    id: inst.id,
    title: inst.element.title,
    duration: inst.duration,
    remaining: inst.remaining,
    position: inst.element.getAttribute("data-position") as NotificationPosition,
  };
}

/**
 * 批量设置元素内联样式
 * @param el - 目标元素
 * @param styleMap - 样式键值对
 */
function setStyles(el: HTMLElement, styleMap: Record<string, string>): void {
  for (const key of Object.keys(styleMap)) {
    el.style.setProperty(key, styleMap[key]);
  }
}

/**
 * 计算 position 容器的内联样式
 * 顶部位置从上方往下堆叠（新通知贴顶），底部位置从下往上（新通知贴底）
 * @param position - 通知位置
 * @returns CSS 样式键值对
 */
function getContainerStyles(position: NotificationPosition): Record<string, string> {
  const styles: Record<string, string> = {
    position: "fixed",
    "z-index": String(globalConfig.zIndex),
    display: "flex",
    // top 系：新通知（append 到末尾）在 column-reverse 中排到最上方贴顶；
    // bottom 系：column 中 append 到末尾排到最下方贴底
    "flex-direction": TOP_POSITIONS.has(position) ? "column-reverse" : "column",
    gap: "12px",
    "pointer-events": "auto",
  };

  switch (position) {
    case "top":
      styles.top = globalConfig.top;
      styles.left = "50%";
      styles.transform = "translateX(-50%)";
      break;
    case "topLeft":
      styles.top = globalConfig.top;
      styles.left = globalConfig.left;
      break;
    case "topRight":
      styles.top = globalConfig.top;
      styles.right = globalConfig.right;
      break;
    case "bottom":
      styles.bottom = globalConfig.bottom;
      styles.left = "50%";
      styles.transform = "translateX(-50%)";
      break;
    case "bottomLeft":
      styles.bottom = globalConfig.bottom;
      styles.left = globalConfig.left;
      break;
    case "bottomRight":
      styles.bottom = globalConfig.bottom;
      styles.right = globalConfig.right;
      break;
  }

  return styles;
}

/**
 * 确保 position 对应的容器存在（惰性创建，挂载到 document.body）
 * @param position - 通知位置
 * @returns 容器元素
 */
function ensureContainer(position: NotificationPosition): HTMLElement {
  let container = containers.get(position);
  if (container) return container;

  container = document.createElement("div");
  container.className = `dockv-notification-container dockv-notification-container-${position}`;
  setStyles(container, getContainerStyles(position));
  document.body.appendChild(container);
  containers.set(position, container);
  return container;
}

/**
 * 解析进度条颜色：单色直接返回；分档数组按当前百分比取所在档位的颜色
 * @param progressColor - 进度条颜色配置
 * @param pct - 当前剩余百分比（0-100）
 * @returns 解析出的颜色值；无配置时返回 undefined（走 type 强调色）
 */
function resolveProgressColor(
  progressColor: ProgressColor | undefined,
  pct: number,
): string | undefined {
  if (typeof progressColor === "string") return progressColor;
  if (Array.isArray(progressColor)) {
    const stops = progressColor;
    if (stops.length === 0) return undefined;
    // 取最后一个 percentage <= pct 的档位；低于首档时用首档颜色
    let color = stops[0].color;
    for (const stop of stops) {
      if (pct >= stop.percentage) color = stop.color;
    }
    return color;
  }
  return undefined;
}

/**
 * 更新进度条：写入宽度与颜色 CSS 变量
 * @param instance - 通知实例
 */
function updateProgress(instance: NotificationInstance): void {
  if (instance.duration <= 0) return;
  const pct = Math.max(0, Math.min(100, (instance.remaining / instance.duration) * 100));
  instance.element.style.setProperty("--dockv-notification-progress", `${pct}%`);
  const color = resolveProgressColor(instance.progressColor, pct);
  if (color) {
    instance.element.style.setProperty("--dockv-notification-progress-color", color);
  }
}

/**
 * 应用进度条配置（open / update 时调用）
 * duration 为 0 时没有倒计时可展示，进度条自动降级为不显示
 * @param instance - 通知实例
 * @param progress - 进度条配置
 */
function applyProgress(instance: NotificationInstance, progress: ProgressOption): void {
  instance.progress = progress;
  if (progress === false || instance.duration <= 0) {
    instance.element.progress = false;
    instance.progressColor = undefined;
    instance.element.style.removeProperty("--dockv-notification-progress-color");
    instance.element.style.removeProperty("--dockv-notification-progress-position");
    instance.element.setAttribute("data-progress-position", "bottom");
    return;
  }

  instance.element.progress = true;
  if (progress === true) {
    instance.progressColor = undefined;
    instance.element.style.removeProperty("--dockv-notification-progress-color");
    instance.element.style.removeProperty("--dockv-notification-progress-position");
    instance.element.setAttribute("data-progress-position", "bottom");
  } else {
    instance.progressColor = progress.color;
    if (typeof progress.color === "string") {
      instance.element.style.setProperty("--dockv-notification-progress-color", progress.color);
    } else {
      instance.element.style.removeProperty("--dockv-notification-progress-color");
    }
    instance.element.setAttribute("data-progress-position", progress.position ?? "bottom");
  }
  updateProgress(instance);
}

/**
 * 停止倒计时（幂等）
 * @param instance - 通知实例
 */
function stopTimer(instance: NotificationInstance): void {
  if (instance.timer !== null) {
    cancelAnimationFrame(instance.timer);
    instance.timer = null;
  }
}

/**
 * 倒计时单帧：用 rAF 每帧刷新，进度条随剩余时间平滑缩窄（无阶梯顿挫）
 * hover（且 pauseOnHover）时该帧不累计耗时，进度条停住；恢复时不跳变
 * @param instance - 通知实例
 */
function tick(instance: NotificationInstance): void {
  const now = performance.now();
  const delta = instance.hovering && instance.pauseOnHover ? 0 : now - instance.lastTick;
  instance.lastTick = now;
  instance.remaining -= delta;
  updateProgress(instance);
  if (instance.remaining <= 0) {
    stopTimer(instance);
    closeInstance(instance);
    return;
  }
  instance.timer = requestAnimationFrame(() => tick(instance));
}

/**
 * 启动自动关闭倒计时：每帧驱动进度条刷新
 * @param instance - 通知实例
 */
function startTimer(instance: NotificationInstance): void {
  if (instance.duration <= 0) return;
  if (instance.timer !== null) return;

  instance.remaining = instance.duration;
  instance.lastTick = performance.now();
  instance.timer = requestAnimationFrame(() => tick(instance));
}

/**
 * 触发关闭流程：停止定时器并播放退出动画（完成后由卡片派发 dv-close）
 * @param instance - 通知实例
 */
function closeInstance(instance: NotificationInstance): void {
  if (instance.closing) return;
  instance.closing = true;
  stopTimer(instance);
  instance.element.startExit();
}

/**
 * 销毁实例：停止定时器、移出实例表并移除 DOM
 * @param instance - 通知实例
 */
function destroyInstance(instance: NotificationInstance): void {
  stopTimer(instance);
  instances.delete(instance.id);
  instance.element.remove();
}

/**
 * 新建通知
 * @param options - 通知选项
 * @returns 唯一 id
 */
function doOpen(options: NotificationOptions = {}): string {
  const {
    id,
    title = "",
    content = "",
    type = "", // 不设置 type：无图标（除非显式传 icon）、强调色用第三色（tertiary）
    color = "",
    variant = globalConfig.variant,
    duration = globalConfig.duration,
    position = globalConfig.position,
    icon = "",
    showClose = globalConfig.showClose,
    progress = globalConfig.progress,
    pauseOnHover = globalConfig.pauseOnHover,
    onClick,
    onClose,
  } = options;

  // 自定义 id 冲突检测：重复直接抛错（不静默更新、不覆盖）
  if (id && instances.has(id)) {
    throw new Error(
      `Notification.open: 自定义 id "${id}" 已存在，重复 id 不允许（更新内容请使用 Notification.update）`,
    );
  }

  const newId = id || generateId();
  const container = ensureContainer(position);

  const element = document.createElement("dv-notification") as NotificationCard;
  element.notificationId = newId;
  // 动画方向由 position 决定，写入 data 属性供 SCSS 选择
  element.setAttribute("data-position", position);
  element.title = title;
  element.content = content;
  element.type = type;
  element.color = color;
  element.variant = variant;
  element.icon = icon;
  element.showClose = showClose;

  const instance: NotificationInstance = {
    id: newId,
    element,
    duration,
    remaining: duration,
    lastTick: 0,
    timer: null,
    hovering: false,
    pauseOnHover,
    progress,
    progressColor: typeof progress === "object" ? progress.color : undefined,
    onClick,
    onClose,
    closing: false,
  };

  const handleClick = (): void => {
    instance.onClick?.();
  };
  const handleClose = (): void => {
    instance.onClose?.();
    destroyInstance(instance);
  };
  const handleMouseEnter = (): void => {
    instance.hovering = true;
  };
  const handleMouseLeave = (): void => {
    instance.hovering = false;
  };

  element.addEventListener("dv-click", handleClick);
  element.addEventListener("dv-close", handleClose);
  element.addEventListener("mouseenter", handleMouseEnter);
  element.addEventListener("mouseleave", handleMouseLeave);

  container.appendChild(element);
  instances.set(newId, instance);

  // 进度条初始状态（含 duration=0 降级不显示）
  applyProgress(instance, progress);

  if (duration > 0) {
    startTimer(instance);
  }

  return newId;
}

/**
 * 更新指定通知（部分配置，只改传入字段；options 不含 id）
 * @param id - 通知 id
 * @param options - 需更新的部分配置
 */
function doUpdate(id: string, options: Omit<Partial<NotificationOptions>, "id">): void {
  const instance = instances.get(id);
  if (!instance) {
    throw new Error(`Notification.update: id "${id}" 不存在`);
  }

  const el = instance.element;
  if (options.title !== undefined) el.title = options.title;
  if (options.content !== undefined) el.content = options.content;
  if (options.type !== undefined) el.type = options.type;
  if (options.color !== undefined) el.color = options.color;
  if (options.variant !== undefined) el.variant = options.variant;
  if (options.icon !== undefined) el.icon = options.icon;
  if (options.showClose !== undefined) el.showClose = options.showClose;
  if (options.progress !== undefined) applyProgress(instance, options.progress);
  if (options.pauseOnHover !== undefined) instance.pauseOnHover = options.pauseOnHover;
  if (options.onClick !== undefined) instance.onClick = options.onClick;
  if (options.onClose !== undefined) instance.onClose = options.onClose;

  // duration 变化：重置倒计时与进度条
  if (options.duration !== undefined) {
    instance.duration = options.duration;
    stopTimer(instance);
    applyProgress(instance, instance.progress);
    startTimer(instance);
  }
}

/**
 * Notification 通知组件（纯命令式全局反馈）
 *
 * 对外提供 open / info / success / warning / error / update / close / destroyAll / config 静态方法。
 * 单文件实现：同文件内定义 <dv-notification> 卡片，避免循环依赖。
 */
export class Notification {
  /**
   * 新建通知
   * @param options - 通知选项
   * @returns 唯一 id
   */
  static open(options: NotificationOptions = {}): string {
    return doOpen(options);
  }

  /** 新建 info 通知 */
  static info(options: NotificationOptions = {}): string {
    return doOpen({ ...options, type: "info" });
  }

  /** 新建 success 通知 */
  static success(options: NotificationOptions = {}): string {
    return doOpen({ ...options, type: "success" });
  }

  /** 新建 warning 通知 */
  static warning(options: NotificationOptions = {}): string {
    return doOpen({ ...options, type: "warning" });
  }

  /** 新建 error 通知 */
  static error(options: NotificationOptions = {}): string {
    return doOpen({ ...options, type: "error" });
  }

  /**
   * 更新指定通知（部分配置，只改传入字段；options 不含 id）
   * @param id - 通知 id
   * @param options - 需更新的部分配置
   */
  static update(id: string, options: Omit<Partial<NotificationOptions>, "id">): void {
    doUpdate(id, options);
  }

  /**
   * 手动关闭（触发退出动画后移除 DOM）；id 不存在时静默忽略
   * @param id - 通知 id
   */
  static close(id: string): void {
    const instance = instances.get(id);
    if (!instance) return;
    closeInstance(instance);
  }

  /**
   * 查询单个通知的运行时快照；id 不存在时返回 undefined
   * @param id - 通知 id
   */
  static get(id: string): NotificationSnapshot | undefined {
    const instance = instances.get(id);
    if (!instance) return undefined;
    return buildSnapshot(instance);
  }

  /** 查询当前所有存活通知的快照数组 */
  static getAll(): NotificationSnapshot[] {
    return [...instances.values()].map(buildSnapshot);
  }

  /** 立即销毁所有通知（跳过动画） */
  static destroyAll(): void {
    for (const instance of instances.values()) {
      destroyInstance(instance);
    }
  }

  /**
   * 设置全局默认配置（duration / position / zIndex / 各方向偏移 / 实例级默认 / 图标映射）
   * @param config - 需覆盖的配置项
   *
   * 说明：
   * - `variant / showClose / progress / pauseOnHover` 只影响之后新建的通知，不回头改已有实例
   * - `icon` 为按 type 的映射，传入时与全局现有图标**浅合并**（可只覆盖部分 type）
   * - 位置 / zIndex 等容器级配置会同步更新已创建的容器
   */
  static config(config: NotificationGlobalConfigInput): void {
    const { icon, ...rest } = config;
    Object.assign(globalConfig, rest);
    // icon 按 type 浅合并，允许局部覆盖（未传的 type 保留原值）
    if (icon) {
      globalConfig.icon = { ...globalConfig.icon, ...icon };
    }
    // 已创建的容器同步新配置（位置 / zIndex 等）
    for (const [position, container] of containers) {
      setStyles(container, getContainerStyles(position));
    }
  }

  /** 当前活跃通知数量 */
  static get count(): number {
    return instances.size;
  }

  /**
   * 内部：卡片从 DOM 断开时清理对应实例的定时器（幂等）
   * 供 NotificationCard.disconnectedCallback 调用，避免外部直接移除元素时定时器泄漏
   * @param card - 断开的卡片元素
   */
  static _handleCardDisconnected(card: NotificationCard): void {
    for (const instance of instances.values()) {
      if (instance.element === card) {
        stopTimer(instance);
        instances.delete(instance.id);
        return;
      }
    }
  }
}

/**
 * 扩展 HTMLElementTagNameMap，让 TypeScript 认识 <dv-notification> 标签
 */
declare global {
  interface HTMLElementTagNameMap {
    "dv-notification": NotificationCard;
  }
}
