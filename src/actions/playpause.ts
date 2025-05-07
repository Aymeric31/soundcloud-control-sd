import { action, KeyDownEvent, SingletonAction, WillAppearEvent } from "@elgato/streamdeck";
import axios from "axios";
import WebSocket from "ws";

@action({ UUID: "com.pepepizza.soundcloud-control-sd.playpause" })
export class PlayPauseAction extends SingletonAction {

  override onWillAppear(ev: WillAppearEvent): void | Promise<void> {
    // Set the initial title of the button
    ev.action.setTitle("Play/Pause");
  }

  override async onKeyDown(): Promise<void> {
    const JS_COMMAND = `
      try {
          // Click the Play/Pause button
          const playButton = document.querySelector('.playControl');
          if (playButton) {
              playButton.click();
              console.log("Play/Pause button clicked.");
          } else {
              console.error("Play/Pause button not found.");
          }
      } catch (error) {
          console.error("An error occurred while trying to click the Play/Pause button:", error);
      }
    `;

    try {
      // Get the list of open tabs in Chrome
      const res = await axios.get("http://localhost:9222/json");
      const tab = res.data.find((t: any) => t.url.includes("soundcloud.com"));
      if (!tab) {
          console.error("No SoundCloud tab found");
          return;
      }

      // Connect to the SoundCloud tab via WebSocket
      const ws = new WebSocket(tab.webSocketDebuggerUrl);
      ws.on("open", () => {
          ws.send(
              JSON.stringify({
                  id: 1,
                  method: "Runtime.evaluate",
                  params: { expression: JS_COMMAND },
              })
          );
          ws.close();
          console.log("Next command sent");
      });
    } catch (err) {
        console.error("Error connecting to SoundCloud: ", err);
    }
  }
}
