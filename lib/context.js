const {
  ChatInputCommandInteraction,
  Message,
  InteractionResponse,
  PermissionsBitField,
  Collection,
} = require("discord.js");
class DjsContextError extends Error {}
class Context {
  /**
   * @type {ChatInputCommandInteraction | Message}
   * @private
   */
  i;
  lastReply;
  deferred = false;
  ephemeral = false;
  replied = false;
  /**
   *
   * @param {ChatInputCommandInteraction | Message} interactionOrMessage The ChatInputCommandInteraction or Message
   */
  constructor(interactionOrMessage) {
    if (
      interactionOrMessage instanceof ChatInputCommandInteraction &&
      !interactionOrMessage.isChatInputCommand()
    ) {
      throw new DjsContextError("Interaction is not a chat input command");
    }
    this.i = interactionOrMessage;
    if (this.i instanceof ChatInputCommandInteraction) {
      this.inCachedGuild = this.i.inCachedGuild();
      this.appPermissions = this.i.appPermissions;
      this.content = `${this.i.commandName} ${this.i.options.data
        .filter((v) => !v.attachment)
        .map((v) => `${v.name}:${v.value}`)
        .join(" ")}`;
      const attachmentsCollection = new Collection();
      this.i.options.data
        .filter((v) => v.attachment)
        .forEach((v) => {
          attachmentsCollection.set(v.attachment.id, v.attachment);
        });
      this.attachments = attachmentsCollection;
    }
    if (this.i instanceof Message) {
      this.inCachedGuild = this.i.inGuild();
      this.appPermissions = this.i.channel.permissionsFor(
        this.i.guild.members.me
      );
      this.content = this.i.content;
      this.attachments = this.i.attachments;
    }
    this.channel = this.i.channel;
    this.channelId = this.i.channelId;
    this.client = this.i.client;
    this.command = this.i.command || this.i.interaction?.command;
    this.commandGuildId =
      this.i.commandGuildId ||
      this.i.interaction?.commandGuildId ||
      this.i.guildId;
    this.commandId = this.i.commandId || this.i.interaction?.commandId;
    this.commandName = this.i.commandName || this.i.interaction?.commandName;
    this.commandType = this.i.commandType || this.i.interaction?.commandType;
    this.createdAt = this.i.createdAt;
    this.inGuild = this.inCachedGuild;
    this.createdTimestamp = this.i.createdTimestamp;
    this.guild = this.i.guild;
    this.guildId = this.i.guildId;
    this.guildLocale = this.i.guildLocale;
    this.id = this.i.id;
    this.locale = this.i.locale;
    this.member = this.i.member;
    this.memberPermissions = this.member?.permissions
      ? new PermissionsBitField(this.member.permissions).freeze()
      : null;
    this.options = this.i.options;
    this.token = this.i.token;
    this.type = this.i.type;
    this.version = this.i.version;
    this.webhook = this.i.webhook;
    this.webhookId = this.i.webhookId;
    this.activity = this.i.activity;
    this.applicationId = this.i.applicationId;
    this.author = this.i.user || this.i.author;
    this.user = this.author;
    this.bulkDeletable = !!this.i.bulkDeletable;
    this.cleanContent = this.i.cleanContent;
    this.components = this.i.components;
    this.crosspostable = !!this.i.crosspostable;
    this.deletable = !!this.i.deletable;
    this.editedAt = this.i.editedAt || this.lastReply?.editedAt;
    this.editedTimestamp =
      this.i.editedTimestamp || this.lastReply?.editedTimestamp;
    this.embeds = this.i.embeds;
    this.flags = this.i.flags;
    this.groupActivityApplication = this.i.groupActivityApplication;
    this.hasThread = !!this.i.hasThread;
    this.mentions = this.i.mentions;
    this.nonce = this.i.nonce;
    this.partial = !!this.i.partial;
    this.pinnable = !!this.i.pinnable;
    this.pinned = !!this.i.pinned;
    this.position = this.i.position;
    this.reactions = this.i.reactions;
    this.reference = this.i.reference;
    this.resolved = this.i.resolved;
    this.roleSubscriptionData = this.i.roleSubscriptionData;
    this.stickers = this.i.stickers;
    this.system = !!this.i.system;
    this.thread = this.i.thread;
    this.tts = !!this.i.tts;
    this.url = this.i.url;
  }
  async deferReply(interactionDeferReplyOptions) {
    if (!(this.i instanceof ChatInputCommandInteraction)) return;
    const deferred = await this.i.deferReply(interactionDeferReplyOptions);
    this.lastReply = deferred;
    this.deferred = true;
    this.ephemeral = interactionDeferReplyOptions.ephemeral;
    return deferred;
  }
  async reply(replyOptions) {
    const replied = await this.i.reply(replyOptions);
    this.lastReply = replied;
    this.replied = true;
    return replied;
  }
  async editReply(editReplyOptions) {
    if (!this.lastReply) {
      throw new DjsContextError(
        `${this.i.constructor.name} was never replied to.`
      );
    }
    const lastReply = await this.lastReply?.edit(editReplyOptions);
    this.lastReply = lastReply;
    return lastReply;
  }
  isMessage() {
    return this.i instanceof Message;
  }
  isInteraction() {
    return this.i instanceof ChatInputCommandInteraction;
  }
}
module.exports = { Context };
