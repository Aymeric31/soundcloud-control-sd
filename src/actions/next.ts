import { action, SingletonAction, WillAppearEvent } from "@elgato/streamdeck";
import axios from "axios";
import WebSocket from "ws";

@action({ UUID: "com.pepepizza.soundcloud-control-sd.next" })
export class NextAction extends SingletonAction {

   override onWillAppear(ev: WillAppearEvent): void | Promise<void> {
      // Set the initial title of the button
      ev.action.setTitle("Next");
    }
   
   override async onKeyDown(): Promise<void> {
      const JS_COMMAND = `
            try {
                // Click the "Next" button
                const nextButton = document.querySelector('.skipControl__next');
                if (nextButton) {
                    nextButton.click();
                    console.log("Next button clicked");
                } else {
                    console.error("Next button not found");
                }
            } catch (error) {
                console.error("Error in the injected script:", error);
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