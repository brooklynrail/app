declare module "@mailchimp/mailchimp_marketing" {
  interface MailchimpConfig {
    apiKey: string
    server: string
  }

  interface AddListMemberOptions {
    email_address: string
    status: "subscribed" | "unsubscribed" | "cleaned" | "pending"
    merge_fields?: Record<string, any>
  }

  interface Lists {
    addListMember(listId: string, options: AddListMemberOptions): Promise<any>
  }

  interface MailchimpClient {
    lists: Lists
    setConfig(config: MailchimpConfig): void
  }

  const mailchimp: MailchimpClient
  export default mailchimp
}
