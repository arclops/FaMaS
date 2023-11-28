import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

const POST_TITLES = [
  'Whiteboard Templates By Industry Leaders',
  'How a Farmer from nashik grew 195 qunital Onions',
  'how Mahadhan helps Farmer Get a Good Pomegranate Produce',
  '✨7 Tips to get the best Wheat Produce  ✨',
  'All you need to know about grape farming in India',
  '7 tips to Get the Best Tomato Yield',
  'Potato – diseases and symptoms',
  'ड्रिप सिंचाई के फायदे',
  'Cotton farming – the success story',
  'Tips on increasing sugarcane yield',
  'Important Tips On Onion Farming',
  'आवश्यक पोषक तत्व और उनके सकारात्मक एवं नकारात्मक प्रभाव',
  'अनार में ऑयली स्‍पॉट रोग की रोकथाम',
  'गन्‍ना: प्रति एकड़ 100 मेट्रिक टन का लक्ष्‍य',
  'प्याज की बेहतर उपज के लिए अच्छी पोषण प्रबंधन प्रणालियों का उपयोग',
  'मिट्टी की उर्वरता और पैदावार की स्थिरता बढ़ाने के लिए मिट्टी में मौजूद जैविक कार्बन महत्वपूर्ण होता है',
  '5 Mistakes Farmers Should Avoid While Applying Fertilisers',
  'Harvesting Tips For Grapes',
  'Get a high sugarcane yield with Mahadhan Total',
  'Why is soil testing important for banana farming?',
  'How a farmer cultivated 144 tonne sugarcane per acre',
  'Gradient Ticket icon',
  'How to get the best Soybean produce',
  'दुष्काळ सदृष्य परिस्थितीमध्ये फवारणीद्वारे विद्राव्य खतांचा कार्यक्षम वापर',
];

export const posts = [...Array(23)].map((_, index) => ({
  id: faker.string.uuid(),
  cover: `/assets/images/covers/cover_${index + 1}.jpg`,
  title: POST_TITLES[index + 1],
  createdAt: faker.date.past(),
  view: faker.number.int(99999),
  comment: faker.number.int(99999),
  share: faker.number.int(99999),
  favorite: faker.number.int(99999),
  author: {
    name: faker.person.fullName(),
    avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  },
}));
