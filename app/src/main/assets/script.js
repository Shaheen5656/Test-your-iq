const qs=[
 ['PATTERN RECOGNITION','Which symbol completes the sequence?','◆ ◇ ◆ ◇ ◆ ?', ['◇','◆','●','▲'],0],['NUMBER LOGIC','What number comes next?','2 · 4 · 8 · 16 · ?',['20','24','32','36'],2],['WORD PLAY','Which word does not belong?','',['Apple','Mango','Carrot','Banana'],2],['SPATIAL THINKING','Turn △ upside down. What do you get?','△ → ?',['▽','□','◇','○'],0],['NUMBER LOGIC','Find the missing number: 3+5=16, 4+6=20, 5+7=?','',['22','24','26','28'],1],['PATTERN RECOGNITION','What comes next?','● ●● ●●● ?',['●●●●','●●','●●●●●','○○○○'],0],['LOGIC','All Bloops are Razzies. All Razzies are Lazzies. Are all Bloops Lazzies?','',['Yes','No','Cannot tell','Only sometimes'],0],['SEQUENCE','Which letter comes next? A · C · F · J · O · ?','',['R','T','U','V'],2],['QUICK THINKING','A clock shows 3:15. What is the angle between the hands?','',['0°','7.5°','15°','30°'],1],['LOGIC','Rearrange “CIFAIPC”. It is the name of a:','',['City','Ocean','Country','Animal'],1]
];
let n=0,points=0,pick=null,left=30,clock;
const $=x=>document.getElementById(x),show=x=>document.querySelectorAll('.screen').forEach(s=>s.classList.toggle('active',s.id===x));

function load(){
  let q=qs[n];
  pick=null; left=30;
  $('num').textContent=n+1;
  $('progress').style.width=(n+1)*10+'%';
  $('type').textContent=q[0];
  $('question').textContent=q[1];
  $('visual').textContent=q[2];
  $('answers').innerHTML=q[3].map((a,i)=>`<button class="answer" data-i="${i}">${a}</button>`).join('');
  $('next').disabled=true;
  document.querySelectorAll('.answer').forEach(b=>b.onclick=()=>{
    if (pick===null) {
      pick=+b.dataset.i;
      b.classList.add('selected');
      $('next').disabled=false;
    }
  });
  clearInterval(clock);
  clock=setInterval(()=>{
    left--;
    if (left<1) {
      pick=-1;
      lock();
    }
    $('time').textContent=left;
  },1000);
}

function lock(){
  clearInterval(clock);
  if (pick===null) return;
  let right=qs[n][4];
  if (pick===right) points++;
  document.querySelectorAll('.answer').forEach((b,i)=>{
    b.disabled=true;
    if (i===right) b.classList.add('correct');
    if (i===pick && pick!==right) b.classList.add('wrong');
  });
  $('next').disabled=false;
}

$('start').onclick=()=>{ n=0; points=0; show('quiz'); load(); };
$('next').onclick=()=>{
  if (pick===null) return;
  if (document.querySelector('.correct')) {
    n++;
    n<qs.length ? load() : result();
  } else {
    lock();
  }
};

function result(){
  let p=points*10;
  $('score').textContent=p;
  $('correct').textContent=points+'/10';
  $('style').textContent=p>=70 ? 'Quick thinker' : 'Steady thinker';
  $('category').textContent=p>=80 ? 'Pattern master' : p>=50 ? 'Logic explorer' : 'Creative thinker';
  $('mood').textContent=p>=80 ? 'on fire!' : p>=50 ? 'warming up!' : 'just getting started!';
  $('message').textContent=p>=70 ? 'Exceptional instincts — your brain is firing on all cylinders.' : 'Practice makes progress. Try again and beat your score!';
  show('result');
  if (typeof window.showMindSparkInterstitial === 'function') {
    window.showMindSparkInterstitial();
  }
}

$('again').onclick=()=>$('start').click();
$('share').onclick=async()=>{
  let text=`I scored ${$('score').textContent}/100 on MindSpark IQ Test!`;
  try {
    await navigator.clipboard.writeText(text);
    $('note').textContent='Result copied — challenge your friends!';
  } catch (e) {
    $('note').textContent=text;
  }
};
