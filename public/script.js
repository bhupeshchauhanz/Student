const API = 'http://localhost:3000';
async function load() {
  try {
    const res = await fetch(API + '/students');
    const data = await res.json();
    const list = document.getElementById('list');
    list.innerHTML = data.map(s => {
      const status = s.marks >= 40 ? 'Pass' : 'Fail';
      const statusClass = s.marks >= 40 ? 'status-pass' : 'status-fail';
      return `
        <tr>
          <td><span class="code">#${s.id}</span></td>
          <td><strong>${s.name}</strong></td>
          <td>${s.marks}</td>
          <td><span class="status-badge ${statusClass}">${status}</span></td>
          <td><button class="btn-action" onclick="copyId(${s.id})">Copy ID</button></td>
        </tr>
      `;
    }).join('');
  } catch (e) { console.error(e) }
}
async function add() {
  const name = document.getElementById('name').value.trim();
  const marks = Number(document.getElementById('marks').value);
  if (!name) return alert('Enter name');
  const res = await fetch(API + '/students', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, marks }) });
  const json = await res.json();
  document.getElementById('name').value = ''; document.getElementById('marks').value = '';
  load();
  alert('Added: ' + JSON.stringify(json));
}
async function getById() {
  const id = document.getElementById('searchId').value.trim();
  if (!id) return alert('Enter ID');
  const res = await fetch(API + '/students/' + id);
  if (res.status === 404) return alert('Not found');
  const s = await res.json();
  alert(JSON.stringify(s));
}
function copyId(id) { navigator.clipboard?.writeText(String(id)).then(() => alert('Copied ID ' + id)); }
document.getElementById('add').addEventListener('click', add);
document.getElementById('getById').addEventListener('click', getById);
load();
