import hawa from './photos/hawa.jpg';
import root from './photos/root.jpg';
import meenakshi from './photos/meenakshi.jpg';
import hampi from './photos/hampi.jpg';
import ranikivav from './photos/ranikivav.jpg';
import charminar from './photos/charminar.jpg';
import kapil from './photos/kapil.jpg';
import neeraj from './photos/neeraj.jpg';
import panipuri from './photos/panipuri.jpg';
import mysorepak from './photos/mysorepak.jpg';
import sadya from './photos/sadya.jpg';
import vidhana from './photos/vidhana.jpg';
import lalbagh from './photos/lalbagh.jpg';
import cubbon from './photos/cubbon.jpg';
import kurien from './photos/kurien.jpg';
import dhoni from './photos/dhoni.jpg';
import sindhu from './photos/sindhu.jpg';
import chandrayaan from './photos/chandrayaan.jpg';
import halairport from './photos/halairport.jpg';
import ulsoor from './photos/ulsoor.jpg';
import patakha_grid from './photos/grid_gains.jpg';
import godiji_avatar from './photos/godiji_avatar.png';
import diya from './photos/diya.jpg';
import pookalam from './photos/pookalam.jpg';
import mom from './photos/mom.jpg';
import vikrant from './photos/vikrant.jpg';
import ranbirAlia from './photos/ranbir_alia.jpg';
import viratAnushka from './photos/virat_anushka.jpg';
import deepikaRanveer from './photos/deepika_ranveer.jpg';
import ambani from './photos/ambani.jpg';
import srk_gauri from './photos/srk_gauri.jpg';
import amitabh_jaya from './photos/amitabh_jaya.jpg';
import upi from './photos/upi.svg';
import flipkart from './photos/flipkart.png';
import trio from './photos/trio.jpg';
import modi from './photos/modi.jpg';

export const photos: Record<string, string> = {
 ambani, upi, flipkart, trio, modi, godiji_avatar,
    hawa, kurien, dhoni, sindhu, chandrayaan, halairport, ulsoor, patakha_grid, root, meenakshi, hampi, ranikivav, charminar, kapil, neeraj, panipuri, mysorepak, sadya, vidhana, lalbagh, cubbon, diya, pookalam, mom, vikrant,
    ranbir_alia: ranbirAlia, virat_anushka: viratAnushka, deepika_ranveer: deepikaRanveer, srk_gauri, amitabh_jaya,
};

export type Mode = 'blur' | 'zoom' | 'reveal' | 'clear';
export type Q = { p: string; a: string; note?: string; img?: string; mode?: Mode; logo?: boolean; origin?: string; clue?: string; lakes?: string[]; paced?: boolean };
export type Round = { id: string; name: string; tag: string; emoji: string; hue: number; qs: Q[] };

export const rounds: Round[] = [
{ id: 'jodi', name: 'Jodi No. 1', tag: 'Power couples, filmy and otherwise', emoji: '💞', hue: 335, qs: [
  { p: 'Wedding at his Bandra home in April 2022. She played Gangubai Kathiawadi. Name the couple.', a: 'Ranbir Kapoor and Alia Bhatt', img: 'ranbir_alia', mode: 'reveal', note: 'They also shared the screen as Shiva and Isha in Brahmastra (2022).' },
  { p: 'Jamnagar is famous because of this power couple.', a: 'Mukesh Ambani and Nita Ambani', note: 'Jamnagar is home to Reliance\'s refinery complex, and hosted their son\'s pre-wedding celebrations in March 2024.', img: 'ambani', mode: 'reveal' },
  { p: 'A famous cricketer and a Bollywood actress got married in December 2017. Guess the couple.', a: 'Virat Kohli and Anushka Sharma', img: 'virat_anushka', mode: 'reveal', note: 'They married in Tuscany, Italy, on 11 December 2017.' },
  { p: 'Lake Como, November 2018. She grew up in Bengaluru, he is famous for his energy and bold fashion. Name the couple.', a: 'Deepika Padukone and Ranveer Singh', img: 'deepika_ranveer', mode: 'reveal', note: 'Deepika was born in Copenhagen but grew up in Bengaluru.' },
  { p: 'They met in Delhi in 1984 and married in 1991, before he became one of Bollywood\'s biggest stars. She is an interior designer and co-chairperson of Red Chillies Entertainment. Name the couple.', a: 'Shah Rukh Khan and Gauri Khan', img: 'srk_gauri', mode: 'reveal' },
  { p: 'In Sholay (1975), which real-life married couple played Jai and Radha?', a: 'Amitabh Bachchan and Jaya Bachchan', img: 'amitabh_jaya', mode: 'reveal', note: 'They had married in June 1973, two years before the film released.' },
]},
{ id: 'bharat', name: 'Bharat Darshan', tag: 'Spot the place, crack the clue', emoji: '🧭', hue: 28, qs: [
  { p: 'This palace has 953 tiny windows so royal ladies could watch the street unseen. Which city?', a: 'Jaipur (Hawa Mahal, built 1799)', img: 'hawa', mode: 'zoom', origin: '70% 30%' },
  { p: 'Which Indian state is famous for its living root bridges?', a: 'Meghalaya (Nongriat village, near Cherrapunji)', img: 'root', mode: 'clear' },
  { p: 'This temple\'s colourful gopurams (gateway towers) are packed with thousands of painted figures. Which city?', a: 'Madurai, Tamil Nadu (Meenakshi Amman Temple)', img: 'meenakshi', mode: 'zoom', origin: '50% 25%', note: 'Not a UNESCO World Heritage Site, but one of India\'s great temples.' },
  { p: 'This stone chariot is printed on the back of which Indian banknote?', a: 'The 50 rupee note (Vittala Temple, Hampi, Karnataka)', img: 'hampi', mode: 'clear', note: 'RBI\'s Mahatma Gandhi (New) Series 50 rupee note shows Hampi with its chariot.' },
  { p: 'Built in 1591 with four minarets, this monument stands in the middle of an old bazaar. Which city?', a: 'Hyderabad (Charminar)', img: 'charminar', mode: 'zoom', origin: '50% 20%' },
  { p: 'This 11th century stepwell, a UNESCO World Heritage Site since 2014, is on the back of the 100 rupee note. Name it and its state.', a: 'Rani ki Vav, Patan, Gujarat', img: 'ranikivav', mode: 'zoom', origin: '30% 60%' },
]},
{ id: 'khel', name: 'Khel Khel Mein', tag: 'Cricket, Olympics and more', emoji: '🏏', hue: 200, qs: [
  { p: 'Lord\'s balcony. Kapil Dev\'s Devils lift India\'s first cricket World Cup. Which year?', a: '1983', img: 'kapil', mode: 'reveal', note: 'India beat the West Indies in the final. The photo shows the team being received by President Giani Zail Singh.' },
  { p: 'Which Indian captain is famous on the field as "Captain Cool"?', a: 'MS Dhoni', img: 'dhoni', mode: 'reveal' },
  { p: 'Javelin gold at the Olympics. Which city hosted those Games?', a: 'Tokyo (Neeraj Chopra, Tokyo 2020 held in 2021)', img: 'neeraj', mode: 'reveal', note: 'He added a silver at Paris 2024.' },
  { p: 'PV Sindhu has two Olympic medals. What colours, in order?', a: 'Silver (Rio 2016), then bronze (Tokyo 2020)', img: 'sindhu', mode: 'reveal' },
  { p: 'How many Olympic gold medals has the Indian men\'s hockey team won?', a: 'Eight', note: 'Six in a row from 1928 to 1956, then 1964 and 1980.' },
  { p: 'February 2010, Gwalior, against South Africa. Who scored the first ever double century in men\'s ODI cricket, and how many?', a: 'Sachin Tendulkar, 200 not out' },
]},
{ id: 'chatpata', name: 'Chatpata Chaupal', tag: 'Street food, sweets and spices', emoji: '🍛', hue: 48, qs: [
  { p: 'Golgappa in Delhi, puchka in Kolkata. What is it called in Mumbai?', a: 'Pani puri', img: 'panipuri', mode: 'clear' },
  { p: 'Which fruit is India\'s national fruit?', a: 'Mango' },
  { p: 'This ghee, gram flour and sugar sweet is credited to the palace kitchens of which city?', a: 'Mysuru (Mysore Pak)', img: 'mysorepak', mode: 'zoom', origin: '50% 50%', note: 'Credited to palace cook Kakasura Madappa.' },
  { p: 'Which two states have both claimed the rasgulla as their own?', a: 'West Bengal and Odisha', note: 'Both won: West Bengal holds a GI tag for Banglar Rasogolla (2017), and Odisha has its own GI tag for Odisha Rasagola. Host call: either state alone is half right.' },
  { p: 'A Kerala sadya feast is traditionally served on which leaf?', a: 'Banana leaf', img: 'sadya', mode: 'reveal' },
  { p: 'Cardamom is the "Queen of Spices". Which Kerala-grown spice is called the "King"?', a: 'Black pepper', note: 'Only black pepper counts. Cardamom is the Queen.' },
]},
{ id: 'filmy', name: 'Filmy Fatafat', tag: 'Emoji, dialogues and songs', emoji: '🎬', hue: 275, qs: [
  { p: 'Emoji clue: 3️⃣ 🤪 🎓. Which film?', a: '3 Idiots (2009)', note: 'Aal izz well.' },
  { p: '"Bade bade deshon mein aisi chhoti chhoti baatein hoti rehti hain, Senorita." Which film?', a: 'Dilwale Dulhania Le Jayenge (1995)' },
  { p: '"Mogambo khush hua!" Which film, and which actor played Mogambo?', a: 'Mr. India (1987), Amrish Puri' },
  { p: 'In which film does Shah Rukh Khan dance on top of a moving train to "Chaiyya Chaiyya"?', a: 'Dil Se (1998)', note: 'Shot on the Nilgiri Mountain Railway.' },
  { p: 'Emoji clue: 🏏 🌾 ☀️. Which film?', a: 'Lagaan (2001)', note: 'It was nominated for the Oscar for Best Foreign Language Film.' },
  { p: 'Which 1957 film, starring Nargis, was the first Indian film nominated for an Oscar?', a: 'Mother India (directed by Mehboob Khan)' },
]},
{ id: 'namma', name: 'Namma Bengaluru', tag: 'The Garden City, up close', emoji: '🌳', hue: 145, qs: [
  { p: 'This granite building, built in the 1950s, houses Karnataka\'s legislature. Name it.', a: 'Vidhana Soudha', img: 'vidhana', mode: 'zoom', origin: '50% 30%' },
  { p: 'Bengaluru is a city of lakes. Name any five lakes in Bengaluru.', a: 'Any five of the lakes below count', lakes: ['Ulsoor (Halasuru)', 'Sankey Tank', 'Hebbal', 'Bellandur', 'Varthur', 'Agara', 'Madiwala', 'Jakkur', 'Yelahanka', 'Puttenahalli', 'Sarakki', 'Kaikondrahalli', 'Nagavara', 'Kempambudhi', 'Dharmambudhi', 'Hulimavu', 'Arekere', 'Rachenahalli', 'Lalbagh Lake', 'Hesaraghatta', 'Munnekollala', 'Harlur Lake', 'Kasavanahalli'] },
  { p: 'Lalbagh\'s Glass House hosts big flower shows around which two national days?', a: 'Republic Day (January) and Independence Day (August)', img: 'lalbagh', mode: 'clear', note: 'Name both for full points. One alone is half right.' },
  { p: 'Before the airport at Devanahalli opened in May 2008, Bengaluru\'s passenger flights used an older airport on Old Airport Road, east of the city centre. What was it called?', a: 'HAL Airport', img: 'halairport', mode: 'reveal', note: 'It began in 1941 as the home of India\'s first aircraft factory, and passenger flights moved to Kempegowda International Airport on 24 May 2008. It still handles charter and VIP flights.' },
  { p: 'Which Bengaluru eatery, open since 1924, is credited with inventing rava idli during a wartime rice shortage?', a: 'MTR (Mavalli Tiffin Rooms)' },
  { p: 'Cubbon Park is named after which British Commissioner of Mysore?', a: 'Sir Mark Cubbon', img: 'cubbon', mode: 'clear', note: 'Officially it is now Sri Chamarajendra Park.' },
]},
{ id: 'diwali', name: 'Diwali Dhamaka', tag: 'Diwali first, then festivals across India', emoji: '🪔', hue: 18, qs: [
  { p: 'Which goddess is worshipped in most homes on Diwali evening?', a: 'Lakshmi' },
  { p: 'In the Ramayana, to which city did Rama return after 14 years of exile?', a: 'Ayodhya' },
  { p: 'The five day Diwali festival begins with which day, when many people buy gold or utensils?', a: 'Dhanteras' },
  { p: 'Not Diwali, but Onam. What is Kerala\'s floral carpet for that festival called?', a: 'Pookalam', img: 'pookalam', mode: 'zoom', origin: '50% 50%' },
  { p: 'In December 2025, Deepavali was added to which UNESCO list?', a: 'The Representative List of the Intangible Cultural Heritage of Humanity', img: 'diya', mode: 'reveal' },
  { p: 'Not Diwali, but Bengal\'s biggest festival. Which Kolkata festival was added to UNESCO\'s intangible heritage list in 2021?', a: 'Durga Puja', note: 'Durga Puja in Kolkata, inscribed in December 2021.' },
]},
{ id: 'madein', name: 'Made in India', tag: 'Space, startups and big firsts', emoji: '🚀', hue: 215, qs: [
  { p: 'UPI, the payment system everyone uses, stands for what?', a: 'Unified Payments Interface', img: 'upi', logo: true },
  { p: 'In August 2023, India became the first country to land near the Moon\'s south polar region. Which mission?', a: 'Chandrayaan-3', img: 'chandrayaan', mode: 'reveal', note: 'Landed on 23 August 2023.' },
  { p: 'Flipkart started in Bengaluru in 2007. What did it first sell online?', a: 'Books', img: 'flipkart', logo: true },
  { p: 'Two of these three young leaders were recently arrested at a Delhi protest and spent about a week in jail. Name all three, left to right.', a: 'Saurav Das, Abhijeet Dipke and Ashutosh Ranka (cockroaches)', img: 'trio', note: 'They lead the Cockroach Janta Party (yes, really - founded May 2026, grew out of NEET-UG protests). Das and Ranka were arrested on 13 October 2026 after entering the denotified Jantar Mantar protest site and released about a week later; the party campaigns for the Chief Election Commissioner\'s resignation.' },
  { p: 'Which Indian Navy ship, commissioned in September 2022, is India\'s first home-built aircraft carrier?', a: 'INS Vikrant', img: 'vikrant', mode: 'reveal', note: 'Built at Cochin Shipyard.' },
  { p: 'This Indian motorcycle brand sells an adventure bike named after the world\'s highest mountain range. Which brand?', a: 'Royal Enfield', note: 'The bike is the Himalayan. Royal Enfield has been built in India since 1955 - the oldest motorcycle brand in continuous production.' },
]},
];
