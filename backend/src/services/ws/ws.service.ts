import { config } from "@/config/app.config";
import { Server } from "socket.io";

export class WSService {
  private readonly socket: Server = new Server(config.port);

  onConnection(callback: (socket: any) => void) {
    this.socket.on("connection", callback);
  }

  onDisconnect(callback: (socket: any) => void) {
    this.socket.on("disconnect", callback);
  }
}
