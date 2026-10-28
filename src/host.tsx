/* ---- Host handbook: phone-friendly answer key, separate from player screens (open with #host) ---- */
import { rounds, photos } from './data';

export function HostHandbook() {
    return <div className="hb">
        <header className="hb-head">
            <h1>🪔 Host Handbook</h1>
            <p className="hb-sub">दिमाग की आतिशबाज़ी - every question, picture and answer. Keep this on your phone; players never see it.</p>
        </header>
        {rounds.map(r => <section className="hb-round" key={r.id}>
            <h2>{r.emoji} {r.name}</h2>
            <p className="hb-tag">{r.tag}</p>
            {r.qs.map((q, i) => <div className="hb-q" key={i}>
                <p className="hb-p"><span className="hb-n">Q{i + 1}</span> {q.p}</p>
                {q.img && photos[q.img] && <img className="hb-img" src={photos[q.img]} alt="" />}
                <p className="hb-a">✅ {q.a}</p>
                {q.note && <p className="hb-note">💡 {q.note}</p>}
            </div>)}
        </section>)}
        <section className="hb-round">
            <h2>🎤 Patakha - Godiji</h2>
            <p className="hb-tag">Open floor, no timer, first faithful completion wins 20</p>
            <div className="hb-q">
                <p className="hb-p"><span className="hb-n">🎤</span> One evening at 8 PM, TVs across India suddenly flicked on - this personality had a surprise address for the nation. Clue stem (his actual opening words): "बहनों भाइयों, देश को भ्रष्टाचार और काले धन रूपी दीमक से मुक्त कराने के लिए…" - they complete the announcement.</p>
                <p className="hb-a">✅ "आज मध्य रात्रि यानि 8 नवम्बर 2016 की रात्रि 12 बजे से वर्तमान में जारी 500 रुपये और 1,000 रुपये के करेंसी नोट लीगल टेंडर नहीं रहेंगे, यानि ये मुद्राएँ कानूनन अमान्य होंगी।" Accept any faithful rendering in Hindi or English.</p>
                <p className="hb-note">💡 The address was 8 November 2016 - keep the date out of the clue, it is part of the answer. Official PIB English: "…the five hundred rupee and thousand rupee currency notes presently in use will no longer be legal tender from midnight tonight, that is 8th November 2016." The other "famous line" is from a dubbed parody video, not his real voice. Award via "Who guessed it right?", or "Nobody got it" to close with no points.</p>
            </div>
        </section>
        <section className="hb-round">
            <h2>🧨 Patakha - Grid Gains</h2>
            <p className="hb-tag">Open floor, no timer, first correct call wins 20</p>
            <div className="hb-q">
                <p className="hb-p"><span className="hb-n">🧨</span> 70 labelled cells (columns A-J, rows 1-7) hide the whole torso. Players shout cells, you tap them. A wrong cell shows a red cross and opens a patch; the right ones show 🎯.</p>
                <p className="hb-a">✅ The two nipple cells are E3 and H3. First player to call a correct cell wins 20 points - tap their name under "Who guessed it right?", or "Nobody got it" to close it with no points.</p>
                <p className="hb-note">💡 Opened cells reveal the photo underneath, so the torso slowly un-censors as the game goes on.</p>
            </div>
        </section>
    </div>;
}
