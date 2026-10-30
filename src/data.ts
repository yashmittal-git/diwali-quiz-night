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
import ranbirAliaBlur from './photos/ranbir_alia_blur.jpg';
import viratAnushka from './photos/virat_anushka.jpg';
import deepikaRanveer from './photos/deepika_ranveer.jpg';
import ambani from './photos/ambani.jpg';
import srk_gauri from './photos/srk_gauri.jpg';
import amitabh_jaya from './photos/amitabh_jaya.jpg';
import sachin from './photos/sachin.jpg';
import palash from './photos/palash.jpg';
import mandhana_palash from './photos/mandhana_palash.jpg';
import mango from './photos/mango.jpg';
import pepper from './photos/pepper.jpg';
import mtrlogo from './photos/mtrlogo.png';
import rama from './photos/rama.jpg';
import dhanteras from './photos/dhanteras.jpg';
import dhanteras_reveal from './photos/dhanteras_reveal.jpg';
import durgapuja from './photos/durgapuja.jpg';
import durgapuja_reveal from './photos/durgapuja_reveal.jpg';
import upi from './photos/upi.svg';
import flipkart from './photos/flipkart.png';
import trio from './photos/trio.jpg';
import modi from './photos/modi.jpg';
import filmy_sweater from './photos/filmy_sweater.jpg';
import filmy_sweater_reveal from './photos/filmy_sweater_reveal.jpg';
import filmy_glass from './photos/filmy_glass.jpg';
import filmy_glass_reveal from './photos/filmy_glass_reveal.jpg';
import filmy_rocketry from './photos/filmy_rocketry.jpg';
import filmy_maddock from './photos/filmy_maddock.jpg';
import filmy_alone from './photos/filmy_alone.jpg';
import filmy_blackbuck from './photos/filmy_blackbuck.jpg';
import filmy_neelam from './photos/filmy_neelam.jpg';
import cadbury from './photos/cadbury.jpg';
import smriti from './photos/smriti.jpg';
import tulsi from './photos/tulsi.jpg';
import shinchan from './photos/shinchan.jpg';
import mogambo from './photos/mogambo.jpg';
import amitabh_kbc from './photos/amitabh_kbc.jpg';
import acp_pradyuman from './photos/acp_pradyuman.jpg';
import dance from './photos/dance.jpg';
import indiaflag from './photos/indiaflag.png';
import papad from './photos/papad.jpg';
import doordarshan from './photos/doordarshan.png';
import ramayan from './photos/ramayan.jpg';
import malgudi from './photos/malgudi.jpg';
import raftaar from './photos/raftaar.jpg';
import enfield from './photos/enfield.jpg';


export const photos: Record<string, string> = {
 ambani, upi, flipkart, trio, modi, godiji_avatar,
    hawa, kurien, dhoni, sindhu, chandrayaan, halairport, ulsoor, patakha_grid, root, meenakshi, hampi, ranikivav, charminar, kapil, neeraj, panipuri, mysorepak, sadya, vidhana, lalbagh, cubbon, diya, pookalam, mom, cadbury, vikrant, enfield,
    filmy_sweater, filmy_sweater_reveal, filmy_glass, filmy_glass_reveal, filmy_rocketry, filmy_maddock, filmy_alone, filmy_blackbuck, filmy_neelam,
    smriti, tulsi, shinchan, mogambo, amitabh_kbc, acp_pradyuman, dance, indiaflag, papad, doordarshan, ramayan, malgudi, raftaar,
    ranbir_alia: ranbirAlia, ranbir_alia_blur: ranbirAliaBlur, virat_anushka: viratAnushka, deepika_ranveer: deepikaRanveer, srk_gauri, amitabh_jaya, sachin, palash, mandhana_palash, mango, pepper, mtrlogo, rama, dhanteras, dhanteras_reveal, durgapuja, durgapuja_reveal,
};

export type Mode = 'blur' | 'zoom' | 'reveal' | 'clear';
export type Q = { p: string; a: string; note?: string; img?: string; imgReveal?: string; mode?: Mode; logo?: boolean; origin?: string; clue?: string; lakes?: string[]; paced?: boolean; fit?: string; time?: number; video?: { insta: string; link: string } };
export type Round = { id: string; name: string; tag: string; emoji: string; hue: number; qs: Q[] };

export const rounds: Round[] = [
{ id: 'jodi', name: 'Jodi No. 1', tag: 'Power couples, filmy and otherwise', emoji: '💞', hue: 335, qs: [
  { p: 'Guess the couple from this picture.', a: 'Ranbir Kapoor and Alia Bhatt', img: 'ranbir_alia_blur', imgReveal: 'ranbir_alia', mode: 'clear', fit: 'contain', note: 'They also shared the screen as Shiva and Isha in Brahmastra (2022).' },
  { p: 'Jamnagar is famous because of this power couple.', a: 'Mukesh Ambani and Nita Ambani', note: 'Jamnagar is home to Reliance\'s refinery complex, and hosted their son\'s pre-wedding celebrations in March 2024.', img: 'ambani', mode: 'reveal' },
  { p: 'A famous cricketer and a Bollywood actress got married in Tuscany, Italy in December 2017. Guess the couple.', a: 'Virat Kohli and Anushka Sharma', img: 'virat_anushka', mode: 'reveal', note: 'They married in Tuscany, Italy, on 11 December 2017.' },
  { p: 'Lake Como, November 2018. She grew up in Bengaluru, he is famous for his energy and bold fashion. Name the couple.', a: 'Deepika Padukone and Ranveer Singh', img: 'deepika_ranveer', mode: 'reveal', note: 'Deepika was born in Copenhagen but grew up in Bengaluru.' },
  { p: 'They married in 1991, before he became one of Bollywood\'s biggest stars. She is an interior designer and co-chairperson of Red Chillies Entertainment. Name the couple.', a: 'Shah Rukh Khan and Gauri Khan', img: 'srk_gauri', mode: 'reveal' },
  { p: 'Guess a famous real-life married couple who acted together in the iconic movie Sholay - and were already married to each other when it released.', a: 'Amitabh Bachchan and Jaya Bachchan', img: 'amitabh_jaya', mode: 'reveal', note: 'Married in June 1973, two years before Sholay released. Dharmendra and Hema Malini also starred in Sholay, but married only in 1980 - "already married" is the lock.' },
]},
{ id: 'bharat', name: 'Bharat Darshan', tag: 'Spot the place, crack the clue', emoji: '🧭', hue: 28, qs: [
  { p: 'This palace has 953 tiny windows so royal ladies could watch the street unseen. Which city?', a: 'Jaipur (Hawa Mahal, built 1799)', img: 'hawa', mode: 'zoom', origin: '70% 30%' },
  { p: 'Which Indian state is famous for its living root bridges?', a: 'Meghalaya (Nongriat village, near Cherrapunji)', img: 'root', mode: 'clear' },
  { p: 'This temple\'s colourful gopurams (gateway towers) are packed with thousands of painted figures. Which city?', a: 'Madurai, Tamil Nadu (Meenakshi Amman Temple)', img: 'meenakshi', mode: 'zoom', origin: '50% 25%', note: 'Not a UNESCO World Heritage Site, but one of India\'s great temples.' },
  { p: 'This stone chariot is printed on the back of which Indian banknote?', a: 'The 50 rupee note (Vittala Temple, Hampi, Karnataka)', img: 'hampi', mode: 'clear', note: 'RBI\'s Mahatma Gandhi (New) Series 50 rupee note shows Hampi with its chariot.' },
  { p: 'Built in 1591 with four minarets, this monument stands in the middle of an old bazaar. Which city?', a: 'Hyderabad (Charminar)', img: 'charminar', mode: 'zoom', origin: '50% 40%' },
  { p: 'This 11th century stepwell, a UNESCO World Heritage Site since 2014, is on the back of the 100 rupee note. Name it and its state.', a: 'Rani ki Vav, Patan, Gujarat', img: 'ranikivav', mode: 'zoom', origin: '30% 60%' },
]},
{ id: 'khel', name: 'Khel Khel Mein', tag: 'Cricket, Olympics and more', emoji: '🏏', hue: 200, qs: [
  { p: 'Guess the year when this iconic moment happened at Lord\u2019s balcony.', a: '1983', img: 'kapil', mode: 'clear', fit: 'contain', note: 'India beat the West Indies in the final. The photo shows Kapil Dev lifting the trophy on the Lord\'s balcony.' },
  { p: 'Which Indian captain is famous on the field as "Captain Cool"?', a: 'MS Dhoni', img: 'dhoni', mode: 'reveal' },
  { p: 'India won javelin gold at the Olympics. Which city hosted those Games?', a: 'Tokyo (Neeraj Chopra, Tokyo 2020 held in 2021)', img: 'neeraj', mode: 'reveal', note: 'He added a silver at Paris 2024.' },
  { p: 'PV Sindhu has two Olympic medals. What colours, in order?', a: 'Silver (Rio 2016), then bronze (Tokyo 2020)', img: 'sindhu', mode: 'clear' },
  { p: 'In December 2025, this music composer\'s wedding to one of India\'s biggest women cricketers was called off. Name the cricketer.', a: 'Smriti Mandhana', img: 'palash', imgReveal: 'mandhana_palash', mode: 'clear', fit: 'contain', note: 'Both Smriti Mandhana and Palash Muchhal confirmed the wedding was called off. Theories about why are unverified gossip - do not present them as fact.' },
  { p: 'February 2010, Gwalior, against South Africa. Who scored the first ever double century in men\'s ODI cricket, and how many?', a: 'Sachin Tendulkar, 200 not out', img: 'sachin', mode: 'reveal' },
]},
{ id: 'chatpata', name: 'Chatpata Chaupal', tag: 'Street food, sweets and spices', emoji: '🍛', hue: 48, qs: [
  { p: 'Golgappa in Delhi, puchka in Kolkata. What is it called in Mumbai?', a: 'Pani puri', img: 'panipuri', mode: 'clear' },
  { p: 'Which fruit is India\'s national fruit?', a: 'Mango', img: 'mango', mode: 'reveal' },
  { p: 'This ghee, gram flour and sugar sweet is credited to the palace kitchens of which city?', a: 'Mysuru (Mysore Pak)', img: 'mysorepak', mode: 'zoom', origin: '50% 50%', note: 'Credited to palace cook Kakasura Madappa.' },
  { p: 'Which two states have both claimed the rasgulla as their own?', a: 'West Bengal and Odisha', note: 'Both won: West Bengal holds a GI tag for Banglar Rasogolla (2017), and Odisha has its own GI tag for Odisha Rasagola. Host call: either state alone is half right.' },
  { p: 'A Kerala sadya feast is traditionally served on which leaf?', a: 'Banana leaf', img: 'sadya', mode: 'reveal' },
  { p: 'Cardamom is the "Queen of Spices". Which Kerala-grown spice is called the "King"?', a: 'Black pepper', img: 'pepper', mode: 'reveal', note: 'Only black pepper counts. Cardamom is the Queen.' },
]},
{ id: 'filmy', name: 'Filmy Fatafat', tag: 'Twisty Bollywood trivia', emoji: '🎬', hue: 275, qs: [
  { p: 'Guess the movie from this iconic striped sweater.', a: 'Main Hoon Na!', img: 'filmy_sweater', imgReveal: 'filmy_sweater_reveal', mode: 'clear', note: 'SRK\'s professor look as Ram. The reveal photo shows him in the full outfit.' },
  { p: 'This humble steel glass had a starring moment in which family drama?', a: 'Vivah', img: 'filmy_glass', imgReveal: 'filmy_glass_reveal', mode: 'clear', fit: 'contain', note: 'The scene where Prem drinks from Poonam\'s glass. The reveal photo shows Amrita Rao as Poonam.' },
  { p: 'Which actor directed Rocketry: The Nambi Effect?', a: 'R. Madhavan', img: 'filmy_rocketry', mode: 'reveal', note: 'He also played the lead, scientist Nambi Narayanan. The film released in July 2022.' },
  { p: 'Which production house created the horror-comedy universe of Stree, Bhediya and Munjya, with one of its films grossing over 800 crore?', a: 'Maddock Films', img: 'filmy_maddock', mode: 'reveal', note: 'Stree 2 (2024) crossed 800 crore worldwide.' },
  { p: 'Name the Bollywood film where Bipasha Basu played twin sisters, one of whom was a ghost.', a: 'Alone', img: 'filmy_alone', mode: 'reveal', note: 'The 2015 horror film paired her with Karan Singh Grover.' },
  { p: 'In the 1998 blackbuck case, a complaint named Salman Khan, Saif Ali Khan, Sonali Bendre, Tabu and one more actress from the Hum Saath-Saath Hain cast. Name her.', a: 'Neelam Kothari', img: 'filmy_blackbuck', imgReveal: 'filmy_neelam', mode: 'clear', note: 'The cast was accused of hunting blackbuck near Jodhpur during the shoot. In 2018 a Jodhpur court convicted Salman Khan and acquitted the other four.' },
]},
{ id: 'namma', name: 'Namma Bengaluru', tag: 'The Garden City, up close', emoji: '🌳', hue: 145, qs: [
  { p: 'This granite building, built in the 1950s, holds enormous importance in the state\'s functioning and is a major tourist attraction. Name it.', a: 'Vidhana Soudha', img: 'vidhana', mode: 'zoom', origin: '50% 30%' },
  { p: 'Bengaluru is a city of lakes. Name any five lakes in Bengaluru.', a: 'Any five of the lakes below count', lakes: ['Ulsoor (Halasuru)', 'Sankey Tank', 'Hebbal', 'Bellandur', 'Varthur', 'Agara', 'Madiwala', 'Jakkur', 'Yelahanka', 'Puttenahalli', 'Sarakki', 'Kaikondrahalli', 'Nagavara', 'Kempambudhi', 'Dharmambudhi', 'Hulimavu', 'Arekere', 'Rachenahalli', 'Lalbagh Lake', 'Hesaraghatta', 'Munnekollala', 'Harlur Lake', 'Kasavanahalli'] },
  { p: 'Lalbagh\'s Glass House hosts big flower shows around which two national days?', a: 'Republic Day (January) and Independence Day (August)', img: 'lalbagh', mode: 'clear', note: 'Name both for full points. One alone is half right.' },
  { p: 'Before the airport at Devanahalli opened in May 2008, Bengaluru\'s passenger flights used an older airport. Name that airport?', a: 'HAL Airport', img: 'halairport', mode: 'reveal', note: 'It began in 1941 as the home of India\'s first aircraft factory, and passenger flights moved to Kempegowda International Airport on 24 May 2008. It still handles charter and VIP flights.' },
  { p: 'Which Bengaluru eatery, open since 1924, is credited with inventing rava idli during a wartime rice shortage?', a: 'MTR (Mavalli Tiffin Rooms)', img: 'mtrlogo', mode: 'reveal', logo: true, note: 'The Lalbagh Road restaurant still serves the original menu; MTR Foods grew out of it.' },
  { p: 'Cubbon Park is named after which British Commissioner of Mysore?', a: 'Sir Mark Cubbon', img: 'cubbon', mode: 'clear', note: 'Officially it is now Sri Chamarajendra Park.' },
]},
{ id: 'diwali', name: 'Diwali Dhamaka', tag: 'Diwali first, then festivals across India', emoji: '🪔', hue: 18, qs: [
  { p: 'Which goddess is worshipped in most homes on Diwali evening?', a: 'Lakshmi' },
  { p: 'In the Ramayana, to which city did Rama return after 14 years of exile?', a: 'Ayodhya', img: 'rama', mode: 'clear' },
  { p: 'The five day Diwali festival begins with which day, when many people buy gold or utensils?', a: 'Dhanteras', img: 'dhanteras', imgReveal: 'dhanteras_reveal', mode: 'clear' },
  { p: 'Not Diwali, but Onam. What is Kerala\'s floral carpet for that festival called?', a: 'Pookalam', img: 'pookalam', mode: 'zoom', origin: '50% 50%' },
  { p: 'Which famous TV commercial for Diwali had this tagline: "Is Diwali, kuch achha ho jaye, kuch meetha ho jaye"?', a: 'Cadbury Dairy Milk', img: 'cadbury', mode: 'reveal', note: 'For its 70th year in 2018, Dairy Milk extended its long-running Kuch Meetha Ho Jaaye into Kuch Achha Ho Jaaye, Kuch Meetha Ho Jaaye. Photo: Dairy Milk Silk Diwali gift pack.' },
  { p: 'Not Diwali, but Bengal\'s biggest festival. Which Kolkata festival was added to UNESCO\'s intangible heritage list in 2021?', a: 'Durga Puja', img: 'durgapuja', imgReveal: 'durgapuja_reveal', mode: 'reveal', note: 'Durga Puja in Kolkata, inscribed in December 2021. Answer reveal: host-supplied photo of dhunuchi dancers before the idol.' },
]},
{ id: 'madein', name: 'Made in India', tag: 'Space, startups and big firsts', emoji: '🚀', hue: 215, qs: [
  { p: 'UPI, the payment system everyone uses, stands for what?', a: 'Unified Payments Interface', img: 'upi', logo: true, mode: 'reveal' },
  { p: 'In August 2023, India became the first country to land near the Moon\'s south polar region. Which mission?', a: 'Chandrayaan-3', img: 'chandrayaan', mode: 'reveal', note: 'Landed on 23 August 2023.' },
  { p: 'Flipkart started in Bengaluru in 2007. What did it first sell online?', a: 'Books', img: 'flipkart', logo: true },
  { p: 'Two of these three young leaders were recently arrested at a Delhi protest and spent about a week in jail. Name all three, left to right.', a: 'Saurav Das, Abhijeet Dipke and Ashutosh Ranka (cockroaches)', img: 'trio', note: 'They lead the Cockroach Janta Party (yes, really - founded May 2026, grew out of NEET-UG protests). Das and Ranka were arrested on 13 October 2026 after entering the denotified Jantar Mantar protest site and released about a week later; the party campaigns for the Chief Election Commissioner\'s resignation.' },
  { p: 'Which Indian Navy ship, commissioned in September 2022, is India\'s first home-built aircraft carrier?', a: 'INS Vikrant', img: 'vikrant', mode: 'reveal', note: 'Built at Cochin Shipyard.' },
  { p: 'This Indian motorcycle brand sells an adventure bike named after the world\'s highest mountain range. Which brand?', a: 'Royal Enfield', img: 'enfield', mode: 'reveal', note: 'The bike is the Himalayan. Royal Enfield has been built in India since 1955 - the oldest motorcycle brand in continuous production.' },
]},
{ id: 'tv', name: 'TV Tamasha', tag: 'From Doordarshan to daily soaps', emoji: '📺', hue: 285, qs: [
  { p: 'Name the famous TV show she starred in - and say the title the way it used to be spoken.', a: 'Kyunki Saas Bhi Kabhi Bahu Thi', img: 'smriti', imgReveal: 'tulsi', mode: 'clear', fit: 'contain' },
  { p: 'Identify this famous kid and name its whole family.', a: 'Shinchan, Mitsy, Harry, Himawari and Shiro', img: 'shinchan', fit: 'contain', mode: 'clear', time: 20 },
  { p: '"Daya, darwaza todo!" Name the TV character giving this order, and the show.', a: 'ACP Pradyuman, CID', img: 'acp_pradyuman', imgReveal: 'acp_pradyuman', mode: 'reveal' },
  { p: 'Which Karnataka village became the main filming location for Malgudi Days?', a: 'Agumbe', img: 'malgudi', mode: 'clear' },
  { p: 'Which show returned to Doordarshan in 2020 and drew 7.7 crore viewers on 16 April?', a: 'Ramayan', img: 'doordarshan', imgReveal: 'ramayan', mode: 'clear', fit: 'contain' },
  { p: 'Over the KBC seasons, Amitabh Bachchan has given the clock its own pet names. Name any three.', a: 'Ghadiyal Babu, Shrimati Tiktiki, Sui Mui', img: 'amitabh_kbc', mode: 'clear', time: 20 },
]},
{ id: 'bol', name: 'Bol Ke Dikhao', tag: 'Name it, say it, perform it', emoji: '🎤', hue: 160, qs: [
  { p: 'Name any five Indian dance forms.', a: 'Any five Indian dance forms count', img: 'dance', mode: 'clear', fit: 'contain', time: 20, lakes: ['Bharatanatyam', 'Kathak', 'Kathakali', 'Kuchipudi', 'Odissi', 'Manipuri', 'Mohiniyattam', 'Sattriya', 'Ghoomar', 'Kalbelia', 'Garba', 'Dandiya Raas', 'Bhangra', 'Giddha', 'Lavani', 'Bihu', 'Chhau', 'Yakshagana', 'Garhwali', 'Rouf'] },
  { p: 'Name the national language and the national game of India.', a: 'None, none', img: 'indiaflag', mode: 'clear', fit: 'contain' },
  { p: 'Say "kaccha papad, pakka papad" three times - fast, with no slips!', a: 'Kaccha papad, pakka papad - three times, clean!', img: 'papad', mode: 'clear' },
  { p: 'Sing one film-song line that has the word diya, deep or roshni in it.', a: 'Any true film line with diya, deep or roshni in it' },
  { p: 'Deliver this man\'s famous dialogue - in his style.', a: 'Mogambo khush hua', img: 'mogambo', mode: 'clear' },
  { p: 'Name the famous dialogue from Raftaar in Traitors season one.', a: 'Arjun hota toh astra kamaan mod deta. Ram hota toh Shiv baan tod deta. Yeh satya-asatya ka parakh murkh nahi jaanta. Main Raftaar hoon, maine zubaan di thi, main kaam chhod deta - "Guys, I am an innocent!"', img: 'raftaar', mode: 'reveal', fit: 'contain', time: 30, video: { insta: 'https://www.instagram.com/reel/DcB3D4oPBCw/embed', link: 'https://www.instagram.com/reel/DcB3D4oPBCw' } },
]},
];
