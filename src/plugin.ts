import streamDeck, { LogLevel } from "@elgato/streamdeck";

import { PlayPauseAction } from "./actions/playpause";
import { NextAction } from "./actions/next";
import { InitializeAudioAction } from "./actions/initializeaudio";

// Enable TRACE log level to debug messages between Stream Deck and the plugin.
streamDeck.logger.setLevel(LogLevel.TRACE);

// Register the Play/Pause action.
streamDeck.actions.registerAction(new PlayPauseAction());

// Register the Next action.
streamDeck.actions.registerAction(new NextAction());

// Register the InitializeAudio action.
streamDeck.actions.registerAction(new InitializeAudioAction());

// Connect the plugin to Stream Deck.
streamDeck.connect();