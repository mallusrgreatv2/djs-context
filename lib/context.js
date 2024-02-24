const {
  ChatInputCommandInteraction,
  Message,
  InteractionResponse,
  PermissionsBitField,
  ApplicationCommand,
  ApplicationCommandType,
  Locale,
  CommandInteractionOptionResolver,
  User,
  InteractionWebhook,
  Collection,
  Attachment,
  Embed,
  ClientApplication,
  MessageMentions,
  Sticker,
} = require("discord.js");
class DjsContextError extends Error {}
class Context {
  /**
   * @type {ChatInputCommandInteraction | Message}
   * @private
   */
  i;
  /**
   * @type {InteractionResponse | Message}
   */
  lastReply;
  /**
   * Whether the reply to this interaction or message has been deferred
   * @type {boolean}
   */
  deferred = false;
  /**
   * Whether the reply to this interaction is ephemeral
   * @type {boolean}
   */
  ephemeral = false;
  /**
   * Whether this interaction or message has already been replied to
   */
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
  }
  /**
   * Set of permissions the application or bot has within the channel the interaction was sent from
   * @returns {Readonly<PermissionsBitField>}
   */
  get appPermissions() {
    if (this.i instanceof ChatInputCommandInteraction) {
      return this.i.appPermissions;
    }
    if (this.i instanceof Message) {
      return this.i.channel.permissionsFor(this.i.guild.members.me);
    }
  }
  /**
   * The channel this interaction was sent in
   */
  channel = this.i.channel;
  /**
   * The id of the channel this interaction was sent in
   */
  channelId = this.i.channelId;
  /**
   * The client that instantiated this
   */
  client = this.i.client;
  /**
   * The invoked application command, if it was fetched before
   * @type {ApplicationCommand | undefined}
   */
  command = this.i.command || this.i.interaction?.command;
  /**
   * The id of the guild the invoked application command is registered to, or the guild the message was sent to
   * @type {import("discord.js").Snowflake}
   */
  commandGuildId =
    this.i.commandGuildId ||
    this.i.interaction?.commandGuildId ||
    this.i.guildId;
  /**
   * The invoked application command's id
   * @type {import("discord.js").Snowflake | undefined}
   */
  commandId = this.i.commandId || this.i.interaction?.commandId;
  /**
   * The invoked application command's name
   * @type {string | undefined}
   */
  commandName = this.i.commandName || this.i.interaction?.commandName;
  /**
   * The invoked application command's type
   * @type {ApplicationCommandType.ChatInput | undefined}
   */
  commandType = this.i.commandType || this.i.interaction?.commandType;
  /**
   * The time the interaction or message was created at
   * @type {Date}
   */
  createdAt = this.i.createdAt;
  /**
   * The timestamp the interaction or message was created at
   * @type {number}
   */
  createdTimestamp = this.i.createdTimestamp;
  /**
   * The guild this interaction or message was sent in
   */
  guild = this.i.guild;
  /**
   * The id of the guild this interaction or message was sent in
   */
  guildId = this.i.guildId;
  /**
   * The preferred locale from the guild this interaction was sent in
   * @type {Locale | undefined}
   */
  guildLocale = this.i.guildLocale;
  /**
   * The interaction's or message's id
   */
  id = this.i.id;
  /**
   * The locale of the user who invoked this interaction
   * @type {Locale | undefined}
   */
  locale = this.i.locale;
  /**
   * If this interaction was sent in a guild, the member which sent it
   */
  member = this.i.member;
  /**
   * The permissions of the member, if one exists, in the channel this interaction or message was executed in
   */
  memberPermissions = this.member?.permissions
    ? new PermissionsBitField(this.member.permissions).freeze()
    : null;
  /**
   * The options passed to the command.
   * @type {Omit<CommandInteractionOptionResolver, 'getMessage' | 'getFocused'> | undefined}
   */
  options = this.i.options;
  /**
   * The interaction's token
   * @type {string | undefined}
   */
  token = this.i.token;
  /**
   * The interaction's or message's type
   */
  type = this.i.type;
  /**
   * The version
   * @type {number | undefined}
   */
  version = this.i.version;
  /**
   * An associated interaction webhook, can be used to further interact with this interaction
   * @type {InteractionWebhook | undefined}
   */
  webhook = this.i.webhook;
  /**
   * The id of the webhook that sent the message, if applicable
   * @type {import("discord.js").Snowflake | null | undefined}
   */
  webhookId = this.i.webhookId;
  /**
   * Group activity
   * @type {import("discord.js").MessageActivity | null | undefined}
   */
  activity = this.i.activity;
  /**
   * The id of the application of the interaction (that sent this message, if any)
   */
  applicationId = this.i.applicationId;
  /**
   * The author of the message or interaction
   */
  author = this.i.user || this.i.author;
  /**
   * The user of the message or interaction
   */
  user = this.author;
  /**
   * Whether the message is bulk deletable by the client user
   * @type {boolean}
   */
  bulkDeletable = !!this.i.bulkDeletable;
  /**
   * The message contents with all mentions replaced by the equivalent text. If mentions cannot be resolved to a name, the relevant mention in the message content will not be converted.
   * @type {string | undefined}
   */
  cleanContent = this.i.cleanContent;
  /**
   * An array of action rows in the message. This property requires the GatewayIntentBits.MessageContent privileged intent in a guild for messages that do not mention the client.
   * @type {ActionRow<import("discord.js").MessageActionRowComponent>[] | undefined}
   */
  components = this.i.components;
  /**
   * The content of the message or the name of the command + options of the interaction. This property requires the GatewayIntentBits.MessageContent privileged intent in a guild for messages that do not mention the client.
   * @returns {string}
   */
  get content() {
    if (this.i instanceof ChatInputCommandInteraction) {
      return `${this.i.commandName} ${this.i.options.data
        .filter((v) => !v.attachment)
        .map((v) => `${v.name}:${v.value}`)
        .join(" ")}`;
    }
    if (this.i instanceof Message) {
      return this.i.content;
    }
  }
  /**
   * Whether the message is crosspostable by the client user
   * @type {boolean}
   */
  crosspostable = !!this.i.crosspostable;
  /**
   * Whether the message is deletable by the client user
   */
  deletable = !!this.i.deletable;
  /**
   * The time the message was last edited at (if applicable)
   * @type {Date | null | undefined}
   */
  editedAt = this.i.editedAt || this.lastReply.editedAt;
  /**
   * The timestamp the message was last edited at (if applicable)
   * @type {number | null | undefined}
   */
  editedTimestamp = this.i.editedTimestamp || this.lastReply.editedTimestamp;
  /**
   * An array of embeds in the message - e.g. YouTube Player. This property requires the GatewayIntentBits.MessageContent privileged intent in a guild for messages that do not mention the client.
   * @type {Embed[] | undefined}
   */
  embeds = this.i.embeds;
  /**
   * Flags that are applied to the message
   * @returns {Readonly<MessageFlagsBitField> | undefined}
   */
  flags = this.i.flags;
  /**
   * Supplemental application information for group activities
   * @type {ClientApplication | null | undefined}
   */
  groupActivityApplication = this.i.groupActivityApplication;
  /**
   * Whether this message has a thread associated with it
   * @type {boolean}
   */
  hasThread = !!this.i.hasThread;
  /**
   * Partial data of the interaction that this message is a reply to
   * @type {import("discord.js").MessageInteraction | null}
   */
  get interaction() {
    if (this.i instanceof ChatInputCommandInteraction) {
      return this.i;
    }
    if (this.i instanceof Message) {
      return this.i.interaction;
    }
  }
  /**
   * All valid mentions that the message contains
   * @type {MessageMentions | undefined}
   */
  mentions = this.i.mentions;
  /**
   * A random number or string used for checking message delivery This is only received after the message was sent successfully, and lost if re-fetched
   * @type {string | number | null | undefined}
   */
  nonce = this.i.nonce;
  /**
   * Whether or not this message is a partial
   * @type {boolean}
   */
  partial = !!this.i.partial;
  /**
   * Whether the message is pinnable by the client user
   */
  pinnable = !!this.i.pinnable;
  /**
   * Whether or not this message is pinned
   */
  pinned = !!this.i.pinned;
  /**
   * A generally increasing integer (there may be gaps or duplicates) that represents the approximate position of the message in a thread.
   * @type {number | null | undefined}
   */
  position = this.i.position;
  /**
   * A manager of the reactions belonging to this message
   * @returns {ReactionManager | undefined}
   */
  reactions = this.i.reactions;
  /**
   * Message reference data
   * @type {import("discord.js").MessageReference | null | undefined}
   */
  reference = this.i.reference;
  /**
   * @type {import("discord.js").CommandInteractionResolvedData | null | undefined}
   */
  resolved = this.i.resolved;
  /**
   * The data of the role subscription purchase or renewal. This is present on MessageType.RoleSubscriptionPurchase messages.
   * @type {import("discord.js").RoleSubscriptionData | null}
   */
  roleSubscriptionData = this.i.roleSubscriptionData;
  /**
   * A collection of stickers in the message
   * @type {Collection<import("discord.js").Snowflake, Sticker>}
   */
  stickers = this.i.stickers;
  /**
   * Whether or not this message was sent by Discord, not actually a user (e.g. pin notifications)
   * @type {boolean}
   */
  system = !!this.i.system;
  /**
   * The thread started by this message This property is not suitable for checking whether a message has a thread, use hasThread instead.
   * @type {import("discord.js").AnyThreadChannel | null | undefined}
   */
  thread = this.i.thread;
  /**
   * Whether or not the message was Text-To-Speech
   * @type {boolean}
   */
  tts = !!this.i.tts;
  /**
   * The URL to jump to this message
   * @type {string}
   */
  url = this.i.url;
  /**
   * A collection of attachments in the message or interaction - e.g. Pictures - mapped by their ids. This property requires the GatewayIntentBits.MessageContent privileged intent in a guild for messages that do not mention the client.
   * @returns {Collection<string, Attachment>}
   */
  get attachments() {
    if (this.i instanceof ChatInputCommandInteraction) {
      const collection = new Collection();
      this.i.options.data
        .filter((v) => v.attachment)
        .forEach((v) => {
          collection.set(v.attachment.id, v.attachment);
        });
      return collection;
    }
    if (this.i instanceof Message) {
      return this.i.attachments;
    }
    return new Collection();
  }
  /**
   * Defers the reply if the interaction is of type chat input command.
   * @param {import("discord.js").InteractionDeferReplyOptions} interactionDeferReplyOptions The options for the interaction defer
   */
  async deferReply(interactionDeferReplyOptions) {
    if (!(this.i instanceof ChatInputCommandInteraction)) return;
    const deferred = await this.i.deferReply(interactionDeferReplyOptions);
    this.lastReply = deferred;
    this.deferred = true;
    this.ephemeral = interactionDeferReplyOptions.ephemeral;
    return deferred;
  }
  /**
   * Reply to the interaction or message.
   * @param {import("discord.js").InteractionReplyOptions | import("discord.js").MessageReplyOptions} replyOptions The options to reply to the interaction or message with.
   */
  async reply(replyOptions) {
    const replied = await this.i.reply(replyOptions);
    this.lastReply = replied;
    this.replied = true;
    return replied;
  }
  /**
   * Edit the last reply of an interaction or message.
   * @param {import("discord.js").InteractionEditReplyOptions | import("discord.js").MessageEditOptions} editReplyOptions The options to edit an interaction reply or message with.
   */
  async editReply(editReplyOptions) {
    if (!this.lastReply) {
      throw new DjsContextError(
        `${this.i.constructor.name} was never replied to.`
      );
    }
    const lastReply = await this.lastReply.edit(editReplyOptions);
    this.lastReply = lastReply;
    return lastReply;
  }
  /**
   * Whether this interaction or message is from a cached guild
   * @returns {boolean}
   */
  get inCachedGuild() {
    if (this.i instanceof ChatInputCommandInteraction) {
      return this.i.inCachedGuild();
    }
    if (this.i instanceof Message) {
      return this.i.inGuild();
    }
    return false;
  }
}
module.exports = Context;
