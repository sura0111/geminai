# Geminai

Geminai is a terminal-based AI chatbot that runs on Node.js.

## Installation

To globally install Geminai, run the following command:

```sh
yarn global add geminai-chat-terminal
```

To install Geminai locally, run the following command:

```sh
yarn add -D geminai-chat-terminal
```

## Usage

Once Geminai is installed, you can initiate a chat session by running the following command:

```sh
geminai
```

If you've installed it locally, you can also start it by running the following command:

```sh
yarn geminai
```

You can also specify an API key using the --apiKey or -k flag. Once it's registered, it will not ask again. If the apiKey is not provided, it will prompt you to enter it.

```sh
geminai --apiKey=YOUR_API_KEY
```

You can also specify additional options, such as the condition that will trigger the AI's response and the AI's response to the condition, using the following flags:

* `--condition` or `-c`: The condition that will trigger the AI's response.
* `--response` or `-r`: The AI's response to the condition.
* `--file` or `-f`: The path to a file containing code as an input.

For instance, to begin a chat session with the AI where the condition is "What is the weather today?" and the response is "It is currently 72 degrees Fahrenheit and sunny in San Francisco.", you would run the following command:

```sh
geminai --condition="What is the weather today?" --response="It is currently 72 degrees Fahrenheit and sunny in San Francisco."
```

You can now interact with the AI by typing messages into the terminal window. Geminai will respond to your messages in a natural and informative manner.

## Options

* `--apiKey` or `-k`:  
 It is required and will be prompted for the first time. A new key will be stored in the keychain.
* `--condition` or `-c`:  
 **Description:** The condition that will trigger the AI's response.  
 **Default:** "You are a professional full-stack engineer who utilizes Node.js, TypeScript, Vite, Vue, React, Vite, NextJs, and NuxtJs."  
 **Example:** `geminai --condition "your custom condition"`
* `--response` or `-r`:  
 **Description**: The AI's response to the condition.
 **Default:** "Hi, What would you like to know?"  
 **Example:** `geminai --response="Thank you for your question. I am a large language model, trained by Google."`
* `--file` or `-f`:  
 **Description:** The path to a file containing code as an input.  
 **Default:** None  
 **Example:** `geminai --file="./code.js"`


