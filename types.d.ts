import {
  APIInteractionGuildMember,
  ActionRow,
  AnyThreadChannel,
  ApplicationCommand,
  Attachment,
  ChatInputCommandInteraction,
  Client,
  ClientApplication,
  Collection,
  CommandInteractionOptionResolver,
  CommandInteractionResolvedData,
  Embed,
  Guild,
  GuildMember,
  InteractionDeferReplyOptions,
  InteractionEditReplyOptions,
  InteractionReplyOptions,
  InteractionResponse,
  InteractionType,
  InteractionWebhook,
  Locale,
  Message,
  MessageActionRowComponent,
  MessageActivity,
  MessageEditOptions,
  MessageFlagsBitField,
  MessageInteraction,
  MessageMentions,
  MessageReference,
  MessageReplyOptions,
  MessageType,
  PermissionsBitField,
  ReactionManager,
  RoleSubscriptionData,
  Snowflake,
  Sticker,
  TextBasedChannel,
  User,
} from "discord.js";

declare module "@mallusrgreat/djs-context" {
  declare class Context {
    /**
     * @type {ChatInputCommandInteraction | Message}
     * @private
     */
    private i: any;
    lastReply: InteractionResponse | Message;
    /**
     * Whether the reply to this interaction or message has been deferred
     */
    deferred: boolean;
    /**
     * Whether the reply to this interaction is ephemeral
     */
    ephemeral: boolean;
    /**
     * Whether this interaction or message has already been replied to
     */
    replied: boolean;
    /**
     *
     * @param {ChatInputCommandInteraction | Message} interactionOrMessage The ChatInputCommandInteraction or Message
     */
    constructor(interactionOrMessage: ChatInputCommandInteraction | Message);
    /**
     * Set of permissions the application or bot has within the channel the interaction was sent from
     */
    get appPermissions(): Readonly<PermissionsBitField>;
    /**
     * The channel this interaction was sent in
     */
    channel: TextBasedChannel?;
    /**
     * The id of the channel this interaction was sent in
     */
    channelId: string;
    /**
     * The client that instantiated this
     */
    client: Client<true>;
    /**
     * The invoked application command, if it was fetched before
     */
    command: ApplicationCommand?;
    /**
     * The id of the guild the invoked application command is registered to, or the guild the message was sent to
     */
    commandGuildId: Snowflake;
    /**
     * The invoked application command's id
     */
    commandId: Snowflake?;
    /**
     * The invoked application command's name
     */
    commandName: string?;
    /**
     * The invoked application command's type
     */
    commandType: ApplicationCommand.ChatInput?;
    /**
     * The time the interaction or message was created at
     */
    createdAt: Date;
    /**
     * The timestamp the interaction or message was created at
     */
    createdTimestamp: number;
    /**
     * The guild this interaction or message was sent in
     */
    guild: Guild;
    /**
     * The id of the guild this interaction or message was sent in
     */
    guildId: string;
    /**
     * The preferred locale from the guild this interaction was sent in
     */
    guildLocale: Locale?;
    /**
     * The interaction's or message's id
     */
    id: string;
    /**
     * The locale of the user who invoked this interaction
     */
    locale: Locale?;
    /**
     * If this interaction was sent in a guild, the member which sent it
     */
    member: GuildMember | APIInteractionGuildMember | null;
    /**
     * The permissions of the member, if one exists, in the channel this interaction or message was executed in
     */
    memberPermissions: Readonly<PermissionsBitField>;
    /**
     * The options passed to the command.
     */
    options:
      | Omit<CommandInteractionOptionResolver, "getMessage" | "getFocused">
      | undefined;
    /**
     * The interaction's token
     */
    token: string?;
    /**
     * The interaction's or message's type
     */
    type: MessageType | InteractionType.ApplicationCommand;
    /**
     * The version
     */
    version: number?;
    /**
     * An associated interaction webhook, can be used to further interact with this interaction
     */
    webhook: InteractionWebhook?;
    /**
     * The id of the webhook that sent the message, if applicable
     */
    webhookId: Snowflake?;
    /**
     * Group activity
     */
    activity: MessageActivity?;
    /**
     * The id of the application of the interaction (that sent this message, if any)
     */
    applicationId: string;
    /**
     * The author of the message or interaction
     */
    author: User;
    /**
     * The user of the message or interaction
     */
    user: User;
    /**
     * Whether the message is bulk deletable by the client user
     */
    bulkDeletable: boolean;
    /**
     * The message contents with all mentions replaced by the equivalent text. If mentions cannot be resolved to a name, the relevant mention in the message content will not be converted.
     */
    cleanContent: string?;
    /**
     * An array of action rows in the message. This property requires the GatewayIntentBits.MessageContent privileged intent in a guild for messages that do not mention the client.
     */
    components: ActionRow<MessageActionRowComponent>[]?;
    /**
     * The content of the message or the name of the command + options of the interaction. This property requires the GatewayIntentBits.MessageContent privileged intent in a guild for messages that do not mention the client.
     */
    get content(): string;
    /**
     * Whether the message is crosspostable by the client user
     */
    crosspostable: boolean;
    /**
     * Whether the message is deletable by the client user
     */
    deletable: boolean;
    /**
     * The time the message was last edited at (if applicable)
     */
    editedAt: Date?;
    /**
     * The timestamp the message was last edited at (if applicable)
     * @type {number | null | undefined}
     */
    editedTimestamp: number?;
    /**
     * An array of embeds in the message - e.g. YouTube Player. This property requires the GatewayIntentBits.MessageContent privileged intent in a guild for messages that do not mention the client.
     */
    embeds: Embed[]?;
    /**
     * Flags that are applied to the message
     */
    flags: Readonly<MessageFlagsBitField>?;
    /**
     * Supplemental application information for group activities
     */
    groupActivityApplication: ClientApplication?;
    /**
     * Whether this message has a thread associated with it
     */
    hasThread: boolean;
    /**
     * Partial data of the interaction that this message is a reply to
     */
    get interaction(): MessageInteraction?;
    /**
     * All valid mentions that the message contains
     */
    mentions: MessageMentions?;
    /**
     * A random number or string used for checking message delivery This is only received after the message was sent successfully, and lost if re-fetched
     */
    nonce: (string | number)?;
    /**
     * Whether or not this message is a partial
     */
    partial: boolean;
    /**
     * Whether the message is pinnable by the client user
     */
    pinnable: boolean;
    /**
     * Whether or not this message is pinned
     */
    pinned: boolean;
    /**
     * A generally increasing integer (there may be gaps or duplicates) that represents the approximate position of the message in a thread.
     */
    position: number?;
    /**
     * A manager of the reactions belonging to this message
     */
    reactions: ReactionManager?;
    /**
     * Message reference data
     */
    reference: MessageReference;
    resolved: CommandInteractionResolvedData?;
    /**
     * The data of the role subscription purchase or renewal. This is present on MessageType.RoleSubscriptionPurchase messages.
     */
    roleSubscriptionData: RoleSubscriptionData?;
    /**
     * A collection of stickers in the message
     */
    stickers: Collection<Snowflake, Sticker>;
    /**
     * Whether or not this message was sent by Discord, not actually a user (e.g. pin notifications)
     */
    system: boolean;
    /**
     * The thread started by this message This property is not suitable for checking whether a message has a thread, use hasThread instead.
     */
    thread: AnyThreadChannel?;
    /**
     * Whether or not the message was Text-To-Speech
     */
    tts: boolean;
    /**
     * The URL to jump to this message
     */
    url: string;
    /**
     * A collection of attachments in the message or interaction - e.g. Pictures - mapped by their ids. This property requires the GatewayIntentBits.MessageContent privileged intent in a guild for messages that do not mention the client.
     */
    get attachments(): Collection<string, Attachment>;
    /**
     * Defers the reply if the interaction is of type chat input command.
     * @param interactionDeferReplyOptions The options for the interaction defer
     */
    deferReply(
      interactionDeferReplyOptions: InteractionDeferReplyOptions
    ): Promise<InteractionResponse<boolean> | undefined>;
    /**
     * Reply to the interaction or message.
     * @param replyOptions The options to reply to the interaction or message with.
     */
    reply(
      replyOptions: InteractionReplyOptions | MessageReplyOptions
    ): Promise<
      Message<boolean> | (Message<boolean> & InteractionResponse<boolean>)
    >;
    /**
     * Edit the last reply of an interaction or message.
     * @param editReplyOptions The options to edit an interaction reply or message with.
     */
    editReply(
      editReplyOptions: InteractionEditReplyOptions | MessageEditOptions
    ): Promise<Message<boolean>>;
    /**
     * Whether this interaction or message is from a cached guild
     */
    get inCachedGuild(): boolean;
  }
}
