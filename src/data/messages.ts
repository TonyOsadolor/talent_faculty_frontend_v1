export type ContactRole = 'Instructor' | 'Learner' | 'Administrator' | 'System'

export interface ChatMessage {
  id: string
  /** 'them' renders on the left, 'me' renders on the right. */
  from: 'me' | 'them'
  body: string
  time: string
  read?: boolean
}

export interface Conversation {
  id: string
  name: string
  role: ContactRole
  avatar: string
  email: string
  phone: string
  joined: string
  online: boolean
  preview: string
  time: string
  unreadCount: number
  starred: boolean
  dateLabel: string
  messages: ChatMessage[]
}

const SAMPLE_BODY =
  'Hi admin, I am unable to access the new course, Advanced React Development. Can you please help me?'

const buildThread = (id: string): ChatMessage[] => [
  { id: `${id}-m1`, from: 'them', body: SAMPLE_BODY, time: '10:02 am' },
  { id: `${id}-m2`, from: 'me', body: SAMPLE_BODY, time: '10:05 am', read: true },
  { id: `${id}-m3`, from: 'them', body: SAMPLE_BODY, time: '10:05 am' },
  { id: `${id}-m4`, from: 'me', body: SAMPLE_BODY, time: '10:05 am', read: true },
]

export const conversations: Conversation[] = [
  {
    id: 'michael-udo',
    name: 'Michael Udo',
    role: 'Instructor',
    avatar: '/messages/contact-1.png',
    email: 'mich.udo@trueminds.com',
    phone: '+234 705656 346',
    joined: 'Joined Jan 15, 2025',
    online: true,
    preview: 'The new course looks amazing',
    time: '10:12 am',
    unreadCount: 0,
    starred: false,
    dateLabel: 'August 20th, 2026',
    messages: buildThread('michael-udo'),
  },
  {
    id: 'ahmed-dahni',
    name: 'Ahmed Dahni',
    role: 'Learner',
    avatar: '/messages/contact-2.png',
    email: 'ahmed.d@gmail.com',
    phone: '+234 705656 347',
    joined: 'Joined Feb 2, 2025',
    online: false,
    preview: 'Can you please review my review..',
    time: '9:00 am',
    unreadCount: 10,
    starred: true,
    dateLabel: 'August 20th, 2026',
    messages: buildThread('ahmed-dahni'),
  },
  {
    id: 'ezra-gift',
    name: 'Ezra Gift',
    role: 'Learner',
    avatar: '/messages/contact-3.png',
    email: 'ezra.g@gmail.com',
    phone: '+234 705656 348',
    joined: 'Joined Mar 8, 2025',
    online: false,
    preview: 'I find it difficult updating the couse.',
    time: 'Yesterday',
    unreadCount: 0,
    starred: false,
    dateLabel: 'August 19th, 2026',
    messages: buildThread('ezra-gift'),
  },
  {
    id: 'sanni-musa',
    name: 'Sanni Musa',
    role: 'Instructor',
    avatar: '/messages/contact-4.png',
    email: 'sanni.m@trueminds.com',
    phone: '+234 705656 349',
    joined: 'Joined Apr 12, 2025',
    online: true,
    preview: 'Send the announcement for the ..',
    time: 'Aug 18th',
    unreadCount: 10,
    starred: true,
    dateLabel: 'August 18th, 2026',
    messages: buildThread('sanni-musa'),
  },
  {
    id: 'support-team',
    name: 'Support Team',
    role: 'Administrator',
    avatar: '/messages/contact-5.png',
    email: 'support@trueminds.com',
    phone: '+234 705656 350',
    joined: 'Joined Jan 1, 2025',
    online: true,
    preview: 'We have rectified the issue',
    time: 'Aug 18th',
    unreadCount: 0,
    starred: false,
    dateLabel: 'August 18th, 2026',
    messages: buildThread('support-team'),
  },
  {
    id: 'brahim-brahim',
    name: 'Brahim Brahim',
    role: 'Learner',
    avatar: '/messages/contact-6.png',
    email: 'brahim.b@gmail.com',
    phone: '+234 705656 351',
    joined: 'Joined May 20, 2025',
    online: false,
    preview: 'I have submitted the assignment..',
    time: 'Aug 17th',
    unreadCount: 10,
    starred: false,
    dateLabel: 'August 17th, 2026',
    messages: buildThread('brahim-brahim'),
  },
  {
    id: 'system-notifications',
    name: 'System Notifications',
    role: 'System',
    avatar: '/messages/contact-1.png',
    email: 'no-reply@trueminds.com',
    phone: '-',
    joined: 'Joined Jan 1, 2025',
    online: false,
    preview: 'Scheduled maintenance on Aug..',
    time: 'Aug 16th',
    unreadCount: 10,
    starred: false,
    dateLabel: 'August 16th, 2026',
    messages: buildThread('system-notifications'),
  },
]
