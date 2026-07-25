import type { DNotificationCard } from "./dv-notification";
import "./dv-notification";

export type NotificationType = "info" | "success" | "warning" | "error";

export type NotificationPosition =
  | "top"
  | "topLeft"
  | "topRight"
  | "bottom"
  | "bottomLeft"
  | "bottomRight";

export type NotificationOptions = {
  id?: string;
  title?: string;
  content?: string;
  type?: NotificationType;
  duration?: number;
  position?: NotificationPosition;
  icon?: string;
  showClose?: boolean;
  zIndex?: number;
  onClick?: () => void;
  onClose?: () => void;
};

export type NotificationGlobalConfig = {
  duration: number;
  position: NotificationPosition;
  zIndex: number;
  top: string;
  bottom: string;
  left: string;
  right: string;
};

interface NotificationInstance {
  id: string;
  element: DNotificationCard;
  timer: ReturnType<typeof setTimeout> | null;
  duration: number;
  onClose?: () => void;
  onClick?: () => void;
  _closing: boolean;
  _handleClick: () => void;
  _handleClose: () => void;
  _handleMouseEnter: () => void;
  _handleMouseLeave: () => void;
}

const TOP_POSITIONS = new Set<NotificationPosition>(["top", "topLeft", "topRight"]);

let _idCounter = 0;

function generateId(): string {
  _idCounter++;
  return `dockv-notification-${_idCounter}`;
}

const containers = new Map<NotificationPosition, HTMLElement>();
const instances = new Map<string, NotificationInstance>();

let globalConfig: NotificationGlobalConfig = {
  duration: 3,
  position: "topRight",
  zIndex: 1010,
  top: "24px",
  bottom: "24px",
  left: "24px",
  right: "24px",
};

function setStyles(el: HTMLElement, styles: Record<string, string>): void {
  for (const key of Object.keys(styles)) {
    el.style.setProperty(key, styles[key]);
  }
}

function getContainerStyles(position: NotificationPosition): Record<string, string> {
  const styles: Record<string, string> = {
    position: "fixed",
    "z-index": String(globalConfig.zIndex),
    display: "flex",
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

function clearTimer(instance: NotificationInstance): void {
  if (instance.timer !== null) {
    clearTimeout(instance.timer);
    instance.timer = null;
  }
}

function startTimer(instance: NotificationInstance): void {
  if (instance.duration <= 0) return;
  instance.timer = setTimeout(() => {
    instance.timer = null;
    closeInstance(instance);
  }, instance.duration * 1000);
}

function closeInstance(instance: NotificationInstance): void {
  if (instance._closing) return;
  instance._closing = true;

  clearTimer(instance);
  // 不要立即删除实例，保留 dv-close 事件监听，等待动画结束后由 _handleClose 处理销毁
  // instances.delete(instance.id) 移到 destroyInstance 中

  // 移除除 dv-close 外的其他事件监听
  instance.element.removeEventListener("dv-click", instance._handleClick);
  instance.element.removeEventListener("mouseenter", instance._handleMouseEnter);
  instance.element.removeEventListener("mouseleave", instance._handleMouseLeave);

  instance.element.startExit();
}

function destroyInstance(instance: NotificationInstance): void {
  clearTimer(instance);
  instances.delete(instance.id);

  instance.element.removeEventListener("dv-click", instance._handleClick);
  instance.element.removeEventListener("dv-close", instance._handleClose);
  instance.element.removeEventListener("mouseenter", instance._handleMouseEnter);
  instance.element.removeEventListener("mouseleave", instance._handleMouseLeave);

  if (instance.element.parentNode) {
    instance.element.parentNode.removeChild(instance.element);
  }
}

function doOpen(options: NotificationOptions = {}): string {
  const {
    id,
    title = "",
    content = "",
    type = "info",
    duration = globalConfig.duration,
    position = globalConfig.position,
    icon = "",
    showClose = true,
    onClick,
    onClose,
  } = options;

  if (id && instances.has(id)) {
    const existing = instances.get(id)!;
    existing.element.title = title;
    existing.element.content = content;
    existing.element.type = type;
    existing.element.icon = icon;
    existing.element.showClose = showClose;
    existing.onClose = onClose ?? existing.onClose;
    existing.onClick = onClick ?? existing.onClick;
    return id;
  }

  const newId = id || generateId();
  const container = ensureContainer(position);

  const element = document.createElement("dv-notification") as DNotificationCard;
  element.position = position;
  element.title = title;
  element.content = content;
  element.type = type;
  element.icon = icon;
  element.showClose = showClose;

  const instance: NotificationInstance = {
    id: newId,
    element,
    timer: null,
    duration,
    onClose,
    onClick,
    _closing: false,
    _handleClick: () => {},
    _handleClose: () => {},
    _handleMouseEnter: () => {},
    _handleMouseLeave: () => {},
  };

  instance._handleClick = () => {
    if (onClick) onClick();
  };

  instance._handleClose = () => {
    instance.onClose?.();
    destroyInstance(instance);
  };

  instance._handleMouseEnter = () => {
    clearTimer(instance);
  };

  instance._handleMouseLeave = () => {
    startTimer(instance);
  };

  element.addEventListener("dv-click", instance._handleClick);
  element.addEventListener("dv-close", instance._handleClose);
  element.addEventListener("mouseenter", instance._handleMouseEnter);
  element.addEventListener("mouseleave", instance._handleMouseLeave);

  container.appendChild(element);
  instances.set(newId, instance);

  if (duration > 0) {
    startTimer(instance);
  }

  return newId;
}

export class Notification {
  static open(options: NotificationOptions = {}): string {
    return doOpen(options);
  }

  static info(options: string | NotificationOptions = {}): string {
    const opts =
      typeof options === "string"
        ? { title: options, type: "info" as const }
        : { ...options, type: "info" as const };
    return doOpen(opts);
  }

  static success(options: string | NotificationOptions = {}): string {
    const opts =
      typeof options === "string"
        ? { title: options, type: "success" as const }
        : { ...options, type: "success" as const };
    return doOpen(opts);
  }

  static warning(options: string | NotificationOptions = {}): string {
    const opts =
      typeof options === "string"
        ? { title: options, type: "warning" as const }
        : { ...options, type: "warning" as const };
    return doOpen(opts);
  }

  static error(options: string | NotificationOptions = {}): string {
    const opts =
      typeof options === "string"
        ? { title: options, type: "error" as const }
        : { ...options, type: "error" as const };
    return doOpen(opts);
  }

  static close(id: string): void {
    const instance = instances.get(id);
    if (!instance) return;
    closeInstance(instance);
  }

  static destroyAll(): void {
    for (const instance of instances.values()) {
      destroyInstance(instance);
    }
    instances.clear();
  }

  static config(config: Partial<NotificationGlobalConfig>): void {
    Object.assign(globalConfig, config);
    for (const [position, container] of containers) {
      setStyles(container, getContainerStyles(position));
    }
  }

  static get count(): number {
    return instances.size;
  }
}
