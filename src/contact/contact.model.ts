
export class ContactModel {
    _id: string
    label: string
    body: string
    href: string
    iconType: 'telegram' | 'email' | 'linkedIn' | 'instagram'
    atl?: string
}
