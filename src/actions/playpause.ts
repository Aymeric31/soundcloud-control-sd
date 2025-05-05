import { action, KeyDownEvent, SingletonAction, WillAppearEvent } from "@elgato/streamdeck";
import axios from "axios";
import WebSocket from "ws";

/**
 * Une action pour contrôler Play/Pause sur SoundCloud.
 */
@action({ UUID: "com.pepepizza.soundcloud-control-sd.playpause" })
export class PlayPauseAction extends SingletonAction {
  /**
   * Déclenché lorsque l'action devient visible sur le Stream Deck.
   * Vous pouvez l'utiliser pour initialiser l'état ou afficher un titre.
   */
  override onWillAppear(ev: WillAppearEvent): void | Promise<void> {
    // Définir le titre initial du bouton
    ev.action.setTitle("Play/Pause");
  }

  /**
   * Déclenché lorsque l'utilisateur appuie sur le bouton.
   */
  override async onKeyDown(): Promise<void> {
    const JS_COMMAND = `
      try {
        // Vérifier si l'AudioContext est suspendu et le reprendre
        if (typeof AudioContext !== 'undefined') {
          const audioCtx = new AudioContext();
          if (audioCtx.state === 'suspended') {
            audioCtx.resume().then(() => {
              console.log("AudioContext repris avec succès.");
            }).catch((error) => {
              console.error("Erreur lors de la reprise de l'AudioContext :", error);
            });
          }
        }

        // Cliquer sur le bouton Play/Pause
        const playButton = document.querySelector('.playControl');
        if (playButton) {
          playButton.click();
          console.log("Bouton Play/Pause cliqué.");
        } else {
          console.error("Bouton Play/Pause introuvable.");
        }
      } catch (error) {
        console.error("Erreur dans le script injecté :", error);
      }
    `;

    try {
      // Obtenez la liste des onglets ouverts dans Chrome
      const res = await axios.get("http://localhost:9222/json");
      const tab = res.data.find((t: any) => t.url.includes("soundcloud.com"));
      if (!tab) {
        console.error("❌ Aucun onglet SoundCloud trouvé !");
        return;
      }

      // Connectez-vous à l'onglet SoundCloud via WebSocket
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
        console.log("✅ Commande Play/Pause envoyée !");
      });
    } catch (err) {
      console.error("❌ Erreur lors de la connexion à SoundCloud :", err);
    }
  }
}
