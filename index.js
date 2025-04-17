const fs = require('fs');
const crypto = require('crypto');
const path = require('path');
const child_process = require('child_process');

if (!fs.existsSync("./source")) fs.mkdirSync("./source");
if (fs.existsSync("./output")) fs.rmSync("./output", { recursive: true });
fs.mkdirSync("./output");

for (let file of fs.readdirSync("./source")) {
    let id = crypto.createHash('sha1').update(fs.readFileSync("./source/" + file)).digest('hex');
    fs.mkdirSync("./output/" + id);
    fs.copyFileSync("./source/" + file, "./output/" + id + "/original" + path.extname(file));
    let original = "./output/" + id + "/original" + path.extname(file)

    child_process.execFileSync("ffmpeg", [ "-i", original, "./output/" + id + "/original.flac" ], { stdio: 'inherit' })
    child_process.execFileSync("ffmpeg", [ "-i", original, "./output/" + id + "/originalpcm.wav" ], { stdio: 'inherit' })
    child_process.execFileSync("ffmpeg", [ "-i", original, "-ab", "460k", "-acodec", "pcm_s32le", "-ar", "48000", "-sample_fmt", "s32", "./output/" + id + "/ultrahighpcm.wav" ], { stdio: 'inherit' })
    child_process.execFileSync("ffmpeg", [ "-i", original, "-ab", "460k", "-ar", "48000", "-sample_fmt", "s32", "./output/" + id + "/ultrahigh.flac" ], { stdio: 'inherit' })
    child_process.execFileSync("ffmpeg", [ "-i", original, "-ab", "320k", "-ar", "48000", "-sample_fmt", "s32p", "./output/" + id + "/veryhigh.mp3" ], { stdio: 'inherit' })
    child_process.execFileSync("ffmpeg", [ "-i", original, "-sample_fmt", "s32p", "-qscale:a", "0", "-ar", "48000", "./output/" + id + "/high.mp3" ], { stdio: 'inherit' })
    child_process.execFileSync("ffmpeg", [ "-i", original, "-sample_fmt", "s16p", "-qscale:a", "3", "-ar", "48000", "./output/" + id + "/medium.mp3" ], { stdio: 'inherit' })
    child_process.execFileSync("ffmpeg", [ "-i", original, "-sample_fmt", "s16p", "-qscale:a", "5", "-ar", "44100", "./output/" + id + "/low.mp3" ], { stdio: 'inherit' })
    child_process.execFileSync("ffmpeg", [ "-i", original, "-sample_fmt", "s16p", "-qscale:a", "7", "-ar", "32000", "./output/" + id + "/verylow.mp3" ], { stdio: 'inherit' })
    child_process.execFileSync("ffmpeg", [ "-i", original, "-sample_fmt", "s16p", "-qscale:a", "8", "-ar", "22050", "./output/" + id + "/ultralow.mp3" ], { stdio: 'inherit' })
    child_process.execFileSync("ffmpeg", [ "-i", original, "-sample_fmt", "s16p", "-qscale:a", "9", "-ac", "1", "-ar", "16000", "./output/" + id + "/superlow.mp3" ], { stdio: 'inherit' })
    fs.writeFileSync("./output/" + id + "/original.txt", file);

    fs.unlinkSync(original);
}