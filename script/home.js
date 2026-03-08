// toggle button fucntionality
  const allBtn = document.getElementById("allBtn");
  const openBtn = document.getElementById("openBtn");
  const closedBtn = document.getElementById("closedBtn");

function toggleBtn(id){
  const buttons = [allBtn, openBtn, closedBtn];
  buttons.forEach(btn => {
    btn.classList.remove("btn-primary");
    btn.classList.add("btn-soft");
  });

  const selected = document.getElementById(id);
  selected.classList.add("btn-primary");
  selected.classList.remove("btn-soft");
}

  //3. spinner loading
    
    function showLoading(){
      loadingSpinner.classList.remove('hidden');
      cardContainer.innerHTML = '';
    }
    function hideLoading(){
      loadingSpinner.classList.add('hidden');
    }



// dynamic card creation from API
let allIssues = [];
const cardContainer = document.getElementById("cardContainer");
const issueCount = document.getElementById("issue-count");

async function loadIssueCards() {
  showLoading();
  const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
  const data = await res.json();

  allIssues = (data.data);

  displayIssueCards(allIssues);
  hideLoading();

}

function filterIssues(status){
  showLoading();
  
  setTimeout(() => {
      if(status === 'all'){
    displayIssueCards(allIssues);
    hideLoading();
    return;
  }
  const filteredIssues = allIssues.filter(issue => issue.status === status);
  displayIssueCards(filteredIssues);

  hideLoading();
  }, 50);

}

//card info
// {
//     "id": 44,
//     "title": "Add favorites/bookmarks feature",
//     "description": "Allow users to bookmark frequently accessed pages or items for quick access.",
//     "status": "open",
//     "labels": [
//         "enhancement",
//         "good first issue"
//     ],
//     "priority": "low",
//     "author": "fav_frank",
//     "assignee": "",
//     "createdAt": "2024-02-07T10:30:00Z",
//     "updatedAt": "2024-02-07T10:30:00Z"
// }

function displayIssueCards(cards) {
  if(issueCount){
    issueCount.innerText = cards.length;
  }
  cardContainer.innerHTML = "";
  cards.forEach((card) => {
    // console.log(card);
    const issueCard = document.createElement("div");
    issueCard.setAttribute("onclick", `showCardModal(${card.id})`);
    issueCard.className = `bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow`;

     // Accent bar color (Open vs Closed)
        const accentColor = card.status === 'open' ? 'bg-emerald-500' : 'bg-purple-500';
      
      // Priority Style set
      const priorityStyles = {
        high: "bg-red-100 text-red-500 ",
        medium: "bg-yellow-100 text-yellow-500 ",
        low: "bg-gray-100 text-gray-500 "
      };
      const prStyles = priorityStyles[card.priority.toLowerCase()] || "bg-red-50 text-red-500"; 

      // Assignee faka thakle 'Unassigned' dekhabe
       const assigneeName = card.assignee || "Unassigned";

    issueCard.innerHTML = `
       <div class="h-1 ${accentColor} w-full"></div>
    
           <div class="p-4 flex flex-col h-full">
                 <div class="flex justify-between items-center mb-3">
                  <div>
                     <img src="./assets/${card.status === 'open' ? 'Open-Status.png' : 'Closed-Status.png'}" alt="${card.status}">
                  </div>
                   <span class="${prStyles}  px-4 py-1 rounded-full text-[12px] font-semibold uppercase tracking-wider">
                     ${card.priority}
                   </span>
                 </div>
               
                 <h3 class="text-gray-800 font-bold text-[16px] leading-tight mb-2">${card.title}</h3>
                 <p class="text-gray-500 text-s[12px] leading-normal line-clamp-2 mb-4 grow">${card.description}</p>
               
                 <div class="flex flex-wrap gap-2 mb-4">
                 ${card.labels.map(label => `<span class="bg-orange-100 px-2 py-0.5 rounded-full text-[10px] text-orange-600 font-bold uppercase">${label}</span>`).join('')}
                 </div>

                  <div class=" border-t-2 border-gray-200 pt-3 mt-auto">
                   <div class="text-[12px] text-gray-400 flex justify-between items-center w-full mb-2">
                     <p class="text-sm">#${card.id} <span class="font-medium text-gray-600">${card.author}</span></p>
                     <p class="text-right">${new Date(card.createdAt).toLocaleDateString()}</p>
                   </div>
                   <div class="text-[12px] text-gray-400 flex justify-between items-center w-full">
                     <p><span class="font-medium text-gray-500">Assignee:</span> ${assigneeName}</p>
                     <p class="text-right">update: ${new Date(card.updatedAt).toLocaleDateString()}</p>
                   </div>

                 </div>
                 
               </div>
    `;

    cardContainer.appendChild(issueCard);
  })
} 
loadIssueCards();

// search Issue card 
function searchIssueCard() {
  const searchValue = document.getElementById("input-search").value.toLowerCase();
  const filteredIssues = allIssues.filter(issue => issue.title.trim().toLowerCase().includes(searchValue) || issue.description.trim().toLowerCase().includes(searchValue));
  displayIssueCards(filteredIssues);
}

//show modal card
function showCardModal (issueId){
  const issue = allIssues.find(issue => issue.id === issueId);
  if(!issue){
    return;
  }
  const modalContentArea = document.getElementById("modal-content-area");
  modalContentArea.innerHTML = `

      <h2 class="text-2xl font-bold text-slate-800 mb-3">${issue.title}</h2>

     <div class="flex items-center gap-2 mb-6">
       <span class="bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1.5">
         Opened
       </span>
       <span class="text-slate-400 text-sm">
        <span class="w-2 h-1 font-bold text-black mx-1"> •  </span> Opened by <span class="text-slate-500 font-medium">${issue.author}</span> <span class="w-2 h-1 font-bold text-black mx-1"> • </span> ${new Date(issue.createdAt).toLocaleDateString()}
       </span>
     </div>

     <div class="flex gap-3 mb-6">
       ${issue.labels.map(label => `<span class="bg-orange-100 px-3 py-1 rounded-full text-[12px] text-orange-600 font-bold uppercase">${label}</span>`).join('')}
     </div>

     <p class="text-slate-500 leading-normal  mb-6 text-[16px]">
      ${issue.description}
     </p>

     <div class="bg-base-200 rounded-xl p-5 grid grid-cols-3 items-center mb-4">
       <div>
         <p class="text-slate-400 text-md mb-o.5">Assignee:</p>
         <p class="text-slate-700 font-bold text-lg leading-tight">${issue.assignee || "Unassigned"}</p>
       </div>
       <div class="flex flex-col items-center">
         <p class="text-slate-400 text-md mb-0.5">Priority:</p>
         <span class="bg-red-500 text-white px-4 py-1 rounded-full text-xs font-bold tracking-wider">${issue.priority.toUpperCase()}</span>
       </div>
     </div>

  `;
   document.getElementById("issue_details_modal").showModal();;
  
}



  