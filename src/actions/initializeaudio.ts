import { action, SingletonAction, KeyDownEvent } from "@elgato/streamdeck";
import axios from "axios";
import WebSocket from "ws";

@action({ UUID: "com.pepepizza.soundcloud-control-sd.initializeaudio" })
export class InitializeAudioAction extends SingletonAction {
    override async onKeyDown(ev: KeyDownEvent): Promise<void> {
        console.log("Initializing AudioContext...");

        const JS_COMMAND = `
            try {
                if (typeof AudioContext !== 'undefined') {
                    const audioCtx = new AudioContext();
                    if (audioCtx.state === 'suspended') {
                        audioCtx.resume().then(() => {
                            console.log("AudioContext successfully resumed.");
                        }).catch((error) => {
                            console.error("Error resuming AudioContext:", error);
                        });
                    } else {
                        console.log("AudioContext is already active.");
                    }
                } else {
                    console.error("AudioContext is not supported in this browser.");
                }
            } catch (error) {
                console.error("Error initializing AudioContext:", error);
            }
        `;

        try {
            const res = await axios.get("http://localhost:9222/json");
            const tab = res.data.find((t: any) => t.url.includes("soundcloud.com"));
            if (!tab) {
                console.error("No SoundCloud tab found.");
                return;
            }

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
                console.log("AudioContext initialization command sent.");
            });
        } catch (err) {
            console.error("Error connecting to SoundCloud:", err);
        }
    }
}