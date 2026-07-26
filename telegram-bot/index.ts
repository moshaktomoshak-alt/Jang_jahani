import "dotenv/config";
import { Bot, InlineKeyboard } from "grammy";

// ---- Required environment variables ----
// BOT_TOKEN     : token from @BotFather
// GAME_URL      : https URL of your deployed game (Railway URL or custom domain)
// CHANNEL_URL   : https://t.me/jang_jahani3D  (or your channel link)
const BOT_TOKEN = process.env.BOT_TOKEN;
const GAME_URL = process.env.GAME_URL;
const CHANNEL_URL = process.env.CHANNEL_URL || "https://t.me/jang_jahani3D";

if (!BOT_TOKEN) {
  throw new Error("BOT_TOKEN is missing. Set it in your environment variables.");
}
if (!GAME_URL) {
  throw new Error("GAME_URL is missing. Set it to your deployed game's https URL.");
}

const bot = new Bot(BOT_TOKEN);

// ---------- Texts ----------
const WELCOME_TEXT = (name: string) => `سلام ${name} 👋

به «جنگ جهانی» خوش اومدی 🌍⚔️
یک بازی استراتژی آنلاینه که توش کشورها رو تصرف می‌کنی، متحد می‌شی و امپراتوریت رو گسترش می‌دی.

برای شروع بازی روی دکمه‌ی پایین بزن، یا برای راهنمایی از دکمه‌ی «راهنما» استفاده کن 👇`;

const HELP_TEXT = `📖 راهنمای بازی «جنگ جهانی»

اینجا می‌تونی خلاصه‌ای از نحوه‌ی بازی رو ببینی و به کانال رسمی ما بپیوندی تا از اخبار، آپدیت‌ها و رویدادها باخبر بشی.

برای شروع بازی از دکمه‌ی موجود توی پیام خوش‌آمدگویی (/start) استفاده کن.`;

// ---------- Keyboards ----------
function startKeyboard() {
  return new InlineKeyboard()
    .webApp("🎮 شروع بازی", GAME_URL!)
    .row()
    .text("📖 راهنما", "show_help");
}

function helpKeyboard() {
  return new InlineKeyboard().url("📢 عضویت در کانال ما", CHANNEL_URL);
}

// ---------- Handlers ----------
bot.command("start", async (ctx) => {
  const name = ctx.from?.first_name ?? "دوست عزیز";
  await ctx.reply(WELCOME_TEXT(name), {
    reply_markup: startKeyboard(),
  });
});

bot.command("help", async (ctx) => {
  await ctx.reply(HELP_TEXT, {
    reply_markup: helpKeyboard(),
  });
});

// Inline "راهنما" button on the /start message sends the help as a SEPARATE message
bot.callbackQuery("show_help", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.reply(HELP_TEXT, {
    reply_markup: helpKeyboard(),
  });
});

bot.catch((err) => {
  console.error("Bot error:", err);
});

bot.start();
console.log("Jang Jahani telegram bot is running...");
