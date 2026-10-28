/* ---- Host handbook: phone-friendly answer key, separate from player screens (open with #host) ---- */
import { rounds } from './data';

/* One-line visual descriptions so the host knows what each photo shows without
   loading the whole photo bank on a phone. Grounded in the actual photo files. */
const HB_DESCS: Record<string, string> = {
    ranbir_alia: 'Answer-reveal photo of the couple in matching ivory outfits (not shown with the clue).',
    ambani: 'Answer-reveal photo of Mukesh and Nita Ambani at a wedding reception (not shown with the clue).',
    virat_anushka: 'Answer-reveal photo of the couple at their Mumbai wedding reception (not shown with the clue).',
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
    dhoni: 'MS Dhoni in India colours.',
    neeraj: 'Neeraj Chopra with his javelin.',
    sindhu: 'Question photo of PV Sindhu playing a forehand on court.',
    panipuri: 'A plate of pani puri.',
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
    modi: 'A cartoon illustration (stand-in for the real 2016 address frame, still awaited).',
};

export function HostHandbook() {
    return <div className="hb">
        <header className="hb-head">
            <h1>🪔 Host Handbook</h1>
            <p className="hb-sub">दिमाग की आतिशबाज़ी - every question and answer, text-only for fast phone loading. Keep this on your phone; players never see it.</p>
        </header>
        {rounds.map(r => <section className="hb-round" key={r.id}>
            <h2>{r.emoji} {r.name}</h2>
            <p className="hb-tag">{r.tag}</p>
            {r.qs.map((q, i) => <div className="hb-q" key={i}>
                <p className="hb-p"><span className="hb-n">Q{i + 1}</span> {q.p}</p>
                {q.img && HB_DESCS[q.img] && <p className="hb-desc">🖼️ {HB_DESCS[q.img]}</p>}
                <p className="hb-a">✅ {q.a}</p>
                {q.note && <p className="hb-note">💡 {q.note}</p>}
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
            <h2>🧨 Patakha - Grid Gains</h2>
            <p className="hb-tag">Open floor, no timer, first correct call wins 20</p>
            <div className="hb-q">
                <p className="hb-p"><span className="hb-n">🧨</span> Only the chest is covered: 18 labelled cells, D2 to I4 (the rest of the photo stays visible). Players shout cells, you tap them. A wrong cell shows a red cross and opens a patch; the right ones show 🎯.</p>
                <p className="hb-a">✅ The two nipple cells are E3 and H3. First player to call a correct cell wins 20 points - tap their name under "Who guessed it right?", or "Nobody got it" to close it with no points.</p>
                <p className="hb-note">💡 Opened cells reveal the chest photo underneath, so it slowly un-censors as the game goes on.</p>
            </div>
        </section>
    </div>;
}
