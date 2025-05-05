import streamDeck, { LogLevel } from "@elgato/streamdeck";

import { PlayPauseAction } from "./actions/playpause";

// Activez le niveau de journalisation TRACE pour déboguer les messages entre le Stream Deck et le plugin.
streamDeck.logger.setLevel(LogLevel.TRACE);

// Enregistrez l'action Play/Pause.
streamDeck.actions.registerAction(new PlayPauseAction());

// Connectez le plugin au Stream Deck.
streamDeck.connect();