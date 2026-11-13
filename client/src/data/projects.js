const ph = { tags:['[Tool 1]','[Tool 2]'], image:'', overview:'[YOUR PROJECT DESCRIPTION]', role:'[YOUR ROLE]',
  tools:['[Tool 1]','[Tool 2]'], process:['[STEP 1]','[STEP 2]','[STEP 3]'], result:'[RESULT]', live:'#', github:'#' };
export const PROJECTS = [
  { ...ph, id:'instudy', type:'ui-ux', title:'InStudy Workspace', category:'Product Design · UX', color:'pink' },
  { ...ph, id:'p2', type:'web',   title:'[PROJECT TITLE 2]', category:'[Category] · [Type]', color:'purple' },
  { ...ph, id:'p3', type:'web',   title:'[PROJECT TITLE 3]', category:'[Category] · [Type]', color:'amber' },
  { ...ph, id:'p4', type:'ui-ux', title:'[PROJECT TITLE 4]', category:'[Category] · [Type]', color:'teal' },
  { ...ph, id:'p5', type:'photo', title:'[PROJECT TITLE 5]', category:'[Category] · [Type]', color:'indigo' },
];
export const DECK = [
  { t:'Photography', img:'/assets/cards/photography.webp' },
  { t:'Matcha Hunting', img:'/assets/cards/matcha_hunting.webp' },
  { t:'Building UI Designs', img:'/assets/cards/building_ui_designs.webp' },
  { t:'Visual Journaling', img:'/assets/cards/visual_journaling.webp' },
];
export const SERVICES = [
  { n:'01', t:'Web Development', p:'Responsive, accessible sites and apps built with modern code.', f:'web', ic:'icon-web', color:'teal' },
  { n:'02', t:'UI/UX Design', p:'Interfaces rooted in clarity, empathy and a little delight.', f:'ui-ux', ic:'icon-ui', color:'purple' },
  { n:'03', t:'Product Design', p:'From early flows to polished systems ready to scale.', f:'all', ic:'icon-product', color:'pink' },
  { n:'04', t:'Photography', p:'Honest images, visual stories and considered art direction.', f:'photo', ic:'icon-photo', color:'amber' },
];
