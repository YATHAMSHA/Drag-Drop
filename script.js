const tools = document.querySelectorAll('.tool');
const canvas = document.getElementById('canvas');
const form = document.getElementById('property-form');

let selectedElement = null;

// Drag & Drop Setup
tools.forEach(tool => {
  tool.addEventListener('dragstart', e => {
    e.dataTransfer.setData('type', tool.dataset.type);
  });
});

canvas.addEventListener('dragover', e => e.preventDefault());

canvas.addEventListener('drop', e => {
  e.preventDefault();
  const type = e.dataTransfer.getData('type');
  const el = createElement(type);
  canvas.appendChild(el);
  document.querySelector('.placeholder')?.remove();
});

function createElement(type) {
  let el;
  switch (type) {
    case 'text':
      el = document.createElement('p');
      el.textContent = 'Edit me';
      break;
    case 'image':
      el = document.createElement('img');
      el.src = 'https://imgs.search.brave.com/R8abpCKFGcpHLxhQt6ROBsW8Cg6nAdG-jrNDGmtcUdw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNTAy/NTUyMDc2L3Bob3Rv/L2JsYWNrLWdlbmVy/aWMtY2FyLWZyb250/LXZpZXcuanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPTNBX0xn/LTNIbFB5TVNUSUUx/Q3lMYnJZcnhWT1VF/MXZZc1dja21lQU1V/UGc9';
      break;
    case 'button':
      el = document.createElement('button');
      el.textContent = 'Click Me';
      break;
  }
  el.classList.add('element');
  el.addEventListener('click', () => selectElement(el));
  return el;
}

function selectElement(el) {
  selectedElement = el;
  form.style.display = 'block';

  document.getElementById('prop-text').value = el.textContent || '';
  document.getElementById('prop-font-size').value = parseInt(getComputedStyle(el).fontSize) || 16;
  document.getElementById('prop-color').value = rgbToHex(getComputedStyle(el).color);
  document.getElementById('prop-image-url').value = el.tagName === 'IMG' ? el.src : '';
}

form.addEventListener('input', () => {
  if (!selectedElement) return;

  if (selectedElement.tagName === 'IMG') {
    selectedElement.src = document.getElementById('prop-image-url').value;
  } else {
    selectedElement.textContent = document.getElementById('prop-text').value;
    selectedElement.style.fontSize = document.getElementById('prop-font-size').value + 'px';
    selectedElement.style.color = document.getElementById('prop-color').value;
  }
});

function rgbToHex(rgb) {
  const result = rgb.match(/\d+/g);
  return result
    ? '#' + result.map(x => (+x).toString(16).padStart(2, '0')).join('')
    : '#000000';
}
