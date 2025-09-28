
import { Ceremony } from '@/types';

export const ceremonies: Ceremony[] = [
  // Hindu Ceremonies
  {
    id: 'hindu-marriage',
    name: 'Marriage',
    religion: 'hindu',
    description: 'Traditional Hindu wedding ceremony with all rituals',
    image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400',
    category: 'Wedding'
  },
  {
    id: 'hindu-griha-pravesh',
    name: 'Griha Pravesh',
    religion: 'hindu',
    description: 'House warming ceremony for new home',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400',
    category: 'Home'
  },
  {
    id: 'hindu-satyanarayan',
    name: 'Satyanarayan Puja',
    religion: 'hindu',
    description: 'Worship of Lord Vishnu for prosperity',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    category: 'Puja'
  },
  {
    id: 'hindu-annaprashan',
    name: 'Annaprashan',
    religion: 'hindu',
    description: 'First feeding ceremony for babies',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400',
    category: 'Child'
  },
  {
    id: 'hindu-mundan',
    name: 'Mundan',
    religion: 'hindu',
    description: 'First haircut ceremony for children',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400',
    category: 'Child'
  },
  {
    id: 'hindu-shraddha',
    name: 'Shraddha',
    religion: 'hindu',
    description: 'Ritual for departed souls',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    category: 'Memorial'
  },
  {
    id: 'hindu-upanayan',
    name: 'Upanayan',
    religion: 'hindu',
    description: 'Sacred thread ceremony',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    category: 'Ritual'
  },
  {
    id: 'hindu-ganesh-puja',
    name: 'Ganesh Puja',
    religion: 'hindu',
    description: 'Worship of Lord Ganesha',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    category: 'Puja'
  },
  {
    id: 'hindu-navratri',
    name: 'Navratri Puja',
    religion: 'hindu',
    description: 'Nine nights of Goddess worship',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    category: 'Festival'
  },
  {
    id: 'hindu-diwali',
    name: 'Diwali Puja',
    religion: 'hindu',
    description: 'Festival of lights celebration',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    category: 'Festival'
  },

  // Muslim Ceremonies
  {
    id: 'muslim-nikkah',
    name: 'Nikkah',
    religion: 'muslim',
    description: 'Islamic marriage ceremony',
    image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400',
    category: 'Wedding'
  },
  {
    id: 'muslim-aqiqah',
    name: 'Aqiqah',
    religion: 'muslim',
    description: 'Celebration for newborn child',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400',
    category: 'Child'
  },
  {
    id: 'muslim-janazah',
    name: 'Janazah',
    religion: 'muslim',
    description: 'Islamic funeral prayer',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    category: 'Memorial'
  },
  {
    id: 'muslim-eid-prayers',
    name: 'Eid Prayers',
    religion: 'muslim',
    description: 'Special prayers for Eid celebration',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    category: 'Festival'
  },
  {
    id: 'muslim-milad',
    name: 'Milad-un-Nabi',
    religion: 'muslim',
    description: 'Prophet Muhammad birthday celebration',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    category: 'Festival'
  },
  {
    id: 'muslim-iftar',
    name: 'Iftar',
    religion: 'muslim',
    description: 'Breaking fast ceremony during Ramadan',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    category: 'Ritual'
  },
  {
    id: 'muslim-dua',
    name: 'Dua Ceremonies',
    religion: 'muslim',
    description: 'Special prayer ceremonies',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    category: 'Prayer'
  },

  // Sikh Ceremonies
  {
    id: 'sikh-anand-karaj',
    name: 'Anand Karaj',
    religion: 'sikh',
    description: 'Sikh wedding ceremony',
    image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400',
    category: 'Wedding'
  },
  {
    id: 'sikh-naam-karan',
    name: 'Naam Karan',
    religion: 'sikh',
    description: 'Naming ceremony for newborn',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400',
    category: 'Child'
  },
  {
    id: 'sikh-amrit-sanchar',
    name: 'Amrit Sanchar',
    religion: 'sikh',
    description: 'Sikh initiation ceremony',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    category: 'Ritual'
  },
  {
    id: 'sikh-akhand-paath',
    name: 'Akhand Paath',
    religion: 'sikh',
    description: 'Continuous reading of Guru Granth Sahib',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    category: 'Prayer'
  },
  {
    id: 'sikh-antam-sanskar',
    name: 'Antam Sanskar',
    religion: 'sikh',
    description: 'Sikh funeral ceremony',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    category: 'Memorial'
  },
  {
    id: 'sikh-gurpurab',
    name: 'Gurpurab',
    religion: 'sikh',
    description: 'Guru birthday celebration',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    category: 'Festival'
  },

  // Christian Ceremonies
  {
    id: 'christian-baptism',
    name: 'Baptism',
    religion: 'christian',
    description: 'Christian baptism ceremony',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    category: 'Ritual'
  },
  {
    id: 'christian-mass',
    name: 'Mass',
    religion: 'christian',
    description: 'Holy Mass service',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    category: 'Service'
  },
  {
    id: 'christian-marriage',
    name: 'Marriage',
    religion: 'christian',
    description: 'Christian wedding ceremony',
    image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400',
    category: 'Wedding'
  },
  {
    id: 'christian-confirmation',
    name: 'Confirmation',
    religion: 'christian',
    description: 'Christian confirmation ceremony',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    category: 'Ritual'
  },
  {
    id: 'christian-funeral',
    name: 'Funeral Service',
    religion: 'christian',
    description: 'Christian funeral service',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    category: 'Memorial'
  },
  {
    id: 'christian-communion',
    name: 'Communion',
    religion: 'christian',
    description: 'Holy Communion ceremony',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    category: 'Ritual'
  },
  {
    id: 'christian-christmas',
    name: 'Christmas Service',
    religion: 'christian',
    description: 'Christmas celebration service',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    category: 'Festival'
  },
];
