import textToSpeech from '@google-cloud/text-to-speech';
import type { google } from '@google-cloud/text-to-speech/build/protos/protos';

const client = new textToSpeech.TextToSpeechClient();

export const synthesize = async (text: string, languageCode: string, voiceName: string, ssmlGender: "SSML_VOICE_GENDER_UNSPECIFIED" | "MALE" | "FEMALE" | "NEUTRAL" | google.cloud.texttospeech.v1.SsmlVoiceGender) => {
    try {
        const [response] = await client.synthesizeSpeech({
            input: { text: text },
            voice: { languageCode, ssmlGender, name: voiceName },
            audioConfig: { audioEncoding: 'OGG_OPUS' },
        }); if (response.audioContent) {
            return new Blob([response.audioContent]);
        } else {
            throw new Error("Synthesize does not return any audio content (input text: " + text + ")");
        }
    } catch (e) {
        console.log(e)
        throw e;
    }
}