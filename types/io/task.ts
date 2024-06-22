export interface Task {
  filename: string;
  creator: string;
  finish_at: string;
  created_at: string;
  progress: number;
  downloaded: number;
  url: string;
  type: TaskType;
  status: TaskStatus;
  error: TaskError;
  cancelCallback: () => void;
}

export enum TaskType {
  DOWNLOAD,
  UNZIP,
}

export enum TaskError {
  NONE,
  NETWORK,
  FILESYSTEM,
  UNKNOWN,
}
export enum TaskStatus {
  STARTING,
  DOWNLOADING,
  CANCELED,
  COMPLETED,
  ERROR,
}
