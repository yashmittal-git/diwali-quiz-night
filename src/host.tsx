/* ---- Host handbook: phone-friendly answer key, separate from player screens (open at the /h path) ---- */
import { rounds } from './data';

/* One-line visual descriptions so the host knows what each photo shows without
   loading the whole photo bank on a phone. Grounded in the actual photo files. */
const HB_DESCS: Record<string, string> = {
    ranbir_alia: 'Answer-reveal photo of the couple in matching ivory outfits (not shown with the clue).',
    ambani: 'Answer-reveal photo of Mukesh and Nita Ambani at a wedding reception (not shown with the clue).',
    virat_anushka: 'Answer-reveal photo of the couple at their wedding pheras by the sacred fire (not shown with the clue).',
    deepika_ranveer: 'Answer-reveal photo of the couple at their reception (not shown with the clue).',
    srk_gauri: 'Answer-reveal photo of Shah Rukh and Gauri Khan at an event (not shown with the clue).',
    amitabh_jaya: 'Answer-reveal photo of Amitabh and Jaya Bachchan (not shown with the clue).',
    hawa: 'The pink facade of Hawa Mahal with its rows of tiny windows.',
    root: 'The double-decker living root bridge over a jungle stream.',
    meenakshi: 'A colourful gopuram tower packed with painted figures.',
    hampi: 'The stone chariot at Vittala Temple.',
    charminar: 'Charminar and its four minarets above the old bazaar.',
    ranikivav: 'The carved stepwell terraces of Rani ki Vav.',
    kapil: 'Answer-reveal photo of Kapil Dev lifting the 1983 World Cup trophy on the Lord\'s balcony.',
    sachin: 'Answer-reveal photo of Sachin Tendulkar raising his bat and helmet in India colours.',
    palash: 'Question photo of Palash Muchhal; answer reveal swaps in a couple photo of Smriti Mandhana and Palash together.',
    mango: 'Answer-reveal photo of Badami mangoes.',
    rama: 'Question illustration of Lord Rama holding his bow (Kalighat-style folk painting).',
    dhanteras: 'Question photo of a brass and steel utensil shop in Punjab; answer reveal swaps in a host-supplied photo of mithai on a Rs 10 note.',
    dhanteras_reveal: 'Answer-reveal photo of a piece of mithai on a Rs 10 note in a steel plate (supplied by host).',
    durgapuja: 'Answer reveal swaps in a host-supplied photo of dhunuchi dancers in red-and-white saris before a Durga idol (the earlier Sindoor Khela photo is retained in the bundle but no longer shown).',
    durgapuja_reveal: 'Answer-reveal photo of women performing dhunuchi naach with incense pots before a Durga idol (supplied by host).',
    pepper: 'Answer-reveal photo of Tellicherry black peppercorns.',
    dhoni: 'MS Dhoni in India colours.',
    neeraj: 'Answer-reveal photo of Neeraj Chopra throwing the javelin for India.',
    sindhu: 'Question photo of PV Sindhu playing a forehand on court.',
    panipuri: 'A plate of pani puri.',
    filmy_sweater: 'Question close-up of a brown-and-grey striped sweater; reveal swaps in the full photo of SRK wearing it.',
    filmy_sweater_reveal: 'Answer-reveal photo of Shah Rukh Khan in the striped sweater and shirt (Main Hoon Na).',
    filmy_glass: 'Question close-up of a plain steel glass; reveal swaps in Amrita Rao holding it as Poonam.',
    filmy_glass_reveal: 'Answer-reveal photo of Amrita Rao as Poonam in a purple sari holding the steel glass (Vivah).',
    filmy_rocketry: 'Answer-reveal poster of Rocketry: The Nambi Effect with R. Madhavan\'s face and a rocket launch (not shown with the clue).',
    filmy_maddock: 'Answer-reveal poster collage of the Maddock Supernatural Universe films - Munjya, Roohi, Stree, Bhediya (not shown with the clue).',
    filmy_alone: 'Answer-reveal poster of Alone (2015) - Bipasha Basu as the ghost twin behind Karan Singh Grover (not shown with the clue).',
    filmy_blackbuck: 'Question photo of Saif Ali Khan, Salman Khan, Sonali Bendre and Tabu arriving at court with a blackbuck cutout in front; reveal swaps in a photo of Neelam Kothari.',
    filmy_neelam: 'Answer-reveal photo of Neelam Kothari at a jewellery store event.',

    mysorepak: 'Ghee-rich slabs of Mysore Pak.',
    sadya: 'A full sadya spread on a banana leaf.',
    vidhana: 'The granite facade and dome of Vidhana Soudha.',
    lalbagh: 'The Glass House at Lalbagh.',
    halairport: 'The old HAL airport.',
    cubbon: 'Greenery inside Cubbon Park.',
    pookalam: 'A colourful Onam floral carpet.',
    diya: 'A lit diya.',
    upi: 'The UPI logo.',
    chandrayaan: 'Chandrayaan-3.',
    flipkart: 'The Flipkart logo.',
    trio: 'Three young men at a press conference, mics in front.',
    vikrant: 'The aircraft carrier INS Vikrant at sea.',
    modi: 'TV frame from the PM\u2019s 8 Nov 2016 national address (NDTV LIVE, courtesy DD News), supplied by the host.',
    smriti: 'Question photo of Smriti Irani speaking at a 2023 conclave; answer reveal swaps in the Kyunki Saas Bhi Kabhi Bahu Thi title card with her as Tulsi.',
    tulsi: 'Answer-reveal title card of Kyunki Saas Bhi Kabhi Bahu Thi with Smriti Irani as Tulsi.',
    shinchan: 'Question image of Shinchan (Crayon Shin-chan volume 1 cover art).',
    mogambo: 'Question photo of Amrish Puri as Mogambo in the golden coat (Mr India, 1987).',
    amitabh_kbc: 'Question photo of Amitabh Bachchan at the KBC host desk on the set.',
    dance: 'Question photo of a Bharatanatyam performance.',
    indiaflag: 'The Indian flag, shown with the question and the answer.',
    papad: 'Question photo of a stack of papadums.',
    doordarshan: 'Question image of the classic Doordarshan logo; answer reveal swaps in the Ramayan poster.',
    ramayan: 'Answer-reveal poster of Ramanand Sagar\u2019s Ramayan (Arun Govil and Deepika Chikhalia as Ram and Sita).',
    malgudi: 'Malgudi Days signature title art (R.K. Laxman style), shown with both question and answer.',
    raftaar: 'Answer-reveal frame of Raftaar delivering his elimination speech in The Traitors S1 (with the clip below).',
};

/* Host-only notes that stay out of the player-facing reveal, keyed round:questionIndex */
const HB_NOTES: Record<string, string> = {
    'tv:0': 'The title is sung long and drawn out in the title track - a flat reading is the fun argument to have, your call.',
    'tv:2': 'Shivaji Satam played ACP Pradyuman; CID ran on Sony from 1998. The ACP Pradyuman photo appears only on the answer reveal, not with the clue.',
    'tv:5': 'All three coined by KBC writer RD Tailang: Ghadiyal Babu (season 1), his "wife" Shrimati Tiktiki (accept "Tiki Tiki ji"), and their "child" Sui Mui. All three for the full bonus; two is your call.',
    'bol:0': 'The list on the reveal is a bank, not a checklist - accept any genuine named dance form.',
    'bol:1': 'Neither exists officially. Hindi in Devanagari is the official language of the Union (Article 343) with English continuing; the Sports Ministry confirmed via RTI that no game is declared the national game. Hindi / hockey / cricket are the traps.',
    'bol:3': 'Examples if the floor goes quiet: "Jab deep jale aana" (Chitchor, 1976) or "Diye jalte hain" (Namak Haraam, 1973).',
    'bol:4': 'Mogambo, played by Amrish Puri in Mr India (1987). The delivery is the fun; the line itself is the answer.',
    'bol:5': 'The beats that matter: the Arjun and Ram couplets, "maine zubaan di thi, main kaam chhod deta", and the "I am an innocent" closer (he adds "Bola tha" at the end). Exactness is your call. The reveal photo is a frame from the clip; the embedded video plays the exact verified reel, with an open-link if the embed is blocked.',
};

export function HostHandbook() {
    return <div className="hb">
        <header className="hb-head">
            <h1>🪔 Host Handbook</h1>
            <p className="hb-sub">दिमाग की आतिशबाज़ी - every question and answer, text-only for fast phone loading. Keep this on your phone; teams never see it.</p>
        </header>
        {rounds.map(r => <section className="hb-round" key={r.id}>
            <h2>{r.emoji} {r.name}</h2>
            <p className="hb-tag">{r.tag}</p>
            {r.qs.map((q, i) => <div className="hb-q" key={i}>
                <p className="hb-p"><span className="hb-n">Q{i + 1}</span> {q.p}</p>
                {q.img && HB_DESCS[q.img] && <p className="hb-desc">🖼️ {HB_DESCS[q.img]}</p>}
                <p className="hb-a">✅ {q.a}</p>
                {q.note && <p className="hb-note">💡 {q.note}</p>}
                {HB_NOTES[r.id + ':' + i] && <p className="hb-note">💡 {HB_NOTES[r.id + ':' + i]}</p>}
            </div>)}
        </section>)}
        <section className="hb-round">
            <h2>🎤 Patakha - Godiji</h2>
            <p className="hb-tag">Open floor, no timer, first faithful completion wins 20</p>
            <div className="hb-q">
                <p className="hb-p"><span className="hb-n">🎤</span> One evening at 8 PM, TVs across India suddenly flicked on - this personality had a surprise address for the nation. Clue stem (his actual opening words, one greeting sentence trimmed): "मेरे प्यारे देशवासियों, आज आप सभी से कुछ विशेष निवेदन करना चाहता हूँ। इस वार्ता में कुछ गंभीर विषय, कुछ महत्वपूर्ण निर्णय आप से साझा करूंगा…" - they complete the announcement.</p>
                <p className="hb-a">✅ "आज मध्य रात्रि यानि 8 नवम्बर 2016 की रात्रि 12 बजे से वर्तमान में जारी 500 रुपये और 1,000 रुपये के करेंसी नोट लीगल टेंडर नहीं रहेंगे, यानि ये मुद्राएँ कानूनन अमान्य होंगी।" Accept any faithful rendering in Hindi or English.</p>
                <p className="hb-note">💡 The address was 8 November 2016 - keep the date out of the clue, it is part of the answer. Official PIB English: "…the five hundred rupee and thousand rupee currency notes presently in use will no longer be legal tender from midnight tonight, that is 8th November 2016." The other "famous line" is from a dubbed parody video, not his real voice. Award via "Who guessed it right?", or "Nobody got it" to close with no points.</p>
            </div>
        </section>
        <section className="hb-round">
            <h2>👀 Patakha - Aankhon Ki Gustakhiyan</h2>
            <p className="hb-tag">Open floor, no timer, first correct pair wins 20</p>
            <div className="hb-q">
                <p className="hb-p"><span className="hb-n">👀</span> Two world-famous personalities, eyes only. Teams must name BOTH. The clue shows eyes-only crops; the reveal shows the full photos.</p>
                <p className="hb-a">✅ Yash & Rathish - your hosts, obviously. Award via "Who guessed it right?", or "Nobody got it" to close with no points.</p>
                <p className="hb-note">💡 Both names needed for the points. If a team gets one, keep the floor open for the full pair.</p>
            </div>
        </section>
        <section className="hb-round">
            <h2>🧨 Patakha - Grid Gains</h2>
            <p className="hb-tag">Open floor, no timer, first correct call wins 20</p>
            <div className="hb-q">
                <p className="hb-p"><span className="hb-n">🧨</span> Only the chest strip is covered: 36 square labelled cells, A1 to L3 (the rest of the photo stays visible). Teams shout cells, you tap them. A wrong cell shows a red cross and opens a patch; the right ones show 🎯.</p>
                <p className="hb-a">✅ The two nipple cells are B2 and K2. First team to call a correct cell wins 20 points - tap their name under "Who guessed it right?", or "Nobody got it" to close it with no points.</p>
                <p className="hb-note">💡 Opened cells reveal the chest photo underneath, so it slowly un-censors as the game goes on.</p>
            </div>
        </section>
    </div>;
}
