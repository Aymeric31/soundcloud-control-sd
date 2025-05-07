import streamDeck, { LogLevel } from "@elgato/streamdeck";

import { PlayPauseAction } from "./actions/playpause";
import { NextAction } from "./actions/next";
import { InitializeAudioAction } from "./actions/initializeaudio";


// Activez le niveau de journalisation TRACE pour déboguer les messages entre le Stream Deck et le plugin.
streamDeck.logger.setLevel(LogLevel.TRACE);

// Enregistrez l'action Play/Pause.
streamDeck.actions.registerAction(new PlayPauseAction());

// Enregistrez l'action Next.
streamDeck.actions.registerAction(new NextAction());

// Enregistrez l'action InitializeAudio.
streamDeck.actions.registerAction(new InitializeAudioAction());

// Connectez le plugin au Stream Deck.
streamDeck.connect();