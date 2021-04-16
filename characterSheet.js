const data = {
  name: 'Claudio',
  player: 'Ryan',
  occupation: 'Caçador',
  age: 21,
  sex: 'male',
  birthplace: 'São paulo',
  residence: 'São paulo',

  life: {
    current: 12,
    max: 12,
  },
  sanity: {
    current: 62,
    max: 62,
  },

  weapons: [
    {
      name: 'Balestra',
      type: 'Arco',
      damage: '1d20',
      numCurrent: 1,
      numMax: 1,
      attack: 5,
      reach: '10 m',
      defect: 1,
      area: '',
    },
    {
      name: 'Canivete',
      type: 'Briga',
      damage: '1d10',
      numCurrent: '',
      numMax: '',
      attack: '1/2',
      reach: '',
      defect: 1,
      area: '',
    },
  ],
  attributes: [
    {
      type: 'Aparência',
      amount: 10,
    },
    {
      type: 'Constituição',
      amount: 10,
    },
    {
      type: 'Destreza',
      amount: 10,
    },
    {
      type: 'Educação',
      amount: 10,
    },
    {
      type: 'Força',
      amount: 10,
    },
    {
      type: 'Inteligência',
      amount: 10,
    },
    {
      type: 'Poder',
      amount: 10,
    },
    {
      type: 'Sorte',
      amount: 10,
    },
    {
      type: 'Movimento',
      amount: 10,
    },
    {
      type: '?',
      amount: 10,
    },
  ],
}

data.weapons.map((weapon, index) => {
  addWeaponToTable(weapon, index)
})

data.attributes.map((attribute, index) => {
  addAttribute(attribute, index)
})

$('#name').val(data.name)
$('#player').val(data.player)
$('#occupation').val(data.occupation)
$('#age').val(data.age)
$('#sex').val(data.sex)
$('#birthplace').val(data.birthplace)
$('#residence').val(data.residence)

$('.lifeBar').css('width', `${calculateBar(data.life.current, data.life.max)}%`)
$('#lifeCount').text(`${data.life.current}/${data.life.max}`)
$('#lifeCurrent').val(data.life.current)
$('#lifeMax').val(data.life.max)

$('.sanityBar').css(
  'width',
  `${calculateBar(data.sanity.current, data.sanity.max)}%`
)
$('#sanityCount').text(`${data.sanity.current}/${data.sanity.max}`)
$('#sanityCurrent').val(data.sanity.current)
$('#sanityMax').val(data.sanity.max)

const diceModal = $('#diceAttributes')
const lifeModal = $('#lifeModal')
const sanityModal = $('#sanityModal')

$(window).click(function (event) {
  if (event.target.id == 'diceAttributes') {
    diceModal.css('display', 'none')
    $('#diceNumber').text('')
    $('#diceType').text('')

    $('.modalDice').css('transform', 'rotate(0deg)')
    $('.modalDice').css('-webkit-transform', 'rotate(0deg)')
  } else if (event.target.id == 'lifeModal') {
    lifeModal.css('display', 'none')
  } else if (event.target.id == 'sanityModal') {
    sanityModal.css('display', 'none')
  } else if (event.target.id == 'addWeaponModal') {
    closeModal('#addWeaponModal')
  }
})

function rollAtribute(atribute, amount) {
  console.log(this)

  diceModal.css('display', 'block')

  setTimeout(() => {
    $('.modalDice').css('transform', 'rotate(360deg)')
    $('.modalDice').css('-webkit-transform', 'rotate(360deg)')
  }, 1000)

  setTimeout(() => {
    const diceNumber = rollDice('1d20')
    const diceType = calcDice(amount, diceNumber)
    $('#diceNumber').text(diceNumber)
    $('#diceType').text(diceType)

    setTimeout(() => {
      diceModal.css('display', 'none')
      $('#diceNumber').text('')
      $('#diceType').text('')

      $('.modalDice').css('transform', 'rotate(0deg)')
      $('.modalDice').css('-webkit-transform', 'rotate(0deg)')
    }, 20000)
  }, 2000)
}

$('.lifeBar').click(function () {
  console.log(this)
  lifeModal.css('display', 'block')
})

$('.sanityBar').click(function () {
  console.log(this)
  sanityModal.css('display', 'block')
})

$('#addWeapon').click(function () {
  openModal('#addWeaponModal')
})

$('#lesion').change(function () {
  if (this.checked) {
    console.log('Modo lesionamento grave ativado!')
  } else {
    console.log('Modo lesionamento grave desativado!')
  }
})

$('#injury').change(function () {
  if (this.checked) {
    console.log('Modo lesionamento ativado!')
  } else {
    console.log('Modo lesionado desativado!')
  }
})

$('#dying').change(function () {
  if (this.checked) {
    console.log('Modo morrendo ativado!')
  } else {
    console.log('Modo morrendo desativado!')
  }
})

$('#traumatized').change(function () {
  if (this.checked) {
    console.log('Modo traumatizado ativado!')
  } else {
    console.log('Modo traumatizado desativado!')
  }
})

$('#crazed').change(function () {
  if (this.checked) {
    console.log('Modo enlouquecido ativado!')
  } else {
    console.log('Modo enlouquecido desativado!')
  }
})

$('#addWeaponForm').submit(function (event) {
  var weaponType = ''

  if ($('#weaponType').val() == 'fire') {
    weaponType = 'Fogo'
  } else if ($('#weaponType').val() == 'arch') {
    weaponType = 'Arco'
  } else if ($('#weaponType').val() == 'fight') {
    weaponType = 'Briga'
  }

  const weapon = {
    name: $('#weaponName').val(),
    type: weaponType,
    damage: $('#weapondamage').val(),
    numCurrent: $('#weaponNumCurrent').val(),
    numMax: $('#weaponNumMax').val(),
    attack: $('#weaponAttack').val(),
    reach: $('#weaponReach').val(),
    defect: $('#weaponDefect').val(),
    area: $('#weaponArea').val(),
  }

  data.weapons.push(weapon)
  const id = data.weapons.length - 1
  addWeaponToTable(weapon, id)

  closeModal('#addWeaponModal')
  event.preventDefault()
})

$('#changeLife').submit(function (event) {
  let current = Number($('#lifeCurrent').val())
  const max = Number($('#lifeMax').val())

  if (current > max) {
    alert('A vida atual não pode ser maior que a maxima!')
    current = max
  }

  data.life.current = current
  data.life.max = max
  $('.lifeBar').css('width', `${calculateBar(current, max)}%`)
  $('#lifeCount').text(`${current}/${max}`)

  closeModal('#lifeModal')
  event.preventDefault()
})

$('#changeSanity').submit(function (event) {
  let current = Number($('#sanityCurrent').val())
  const max = Number($('#sanityMax').val())

  if (current > max) {
    alert('A sanidade atual não pode ser maior que a maxima!')
    current = max
  }

  data.sanity.current = current
  data.sanity.max = max
  $('.sanityBar').css('width', `${calculateBar(current, max)}%`)
  $('#sanityCount').text(`${current}/${max}`)

  closeModal('#sanityModal')
  event.preventDefault()
})

function calculateBar(current, max) {
  if (current > max) {
    return 100
  } else if (current < 0) {
    return 0
  } else {
    const value = (100 / max) * current
    const string = value.toString().split('.')[0]
    const percentage = Number(string)
    return percentage
  }
}

function calcDice(ability, dice) {
  // Não encontrei uma forma mais fácil, então fiz assim

  const table = [
    { normal: 20 },
    { normal: 19, good: 20 },
    { normal: 18, good: 20 },
    { normal: 17, good: 19 },
    { normal: 16, good: 19, extreme: 20 },
    { normal: 15, good: 18, extreme: 20 },
    { normal: 14, good: 18, extreme: 20 },
    { normal: 13, good: 17, extreme: 20 },
    { normal: 12, good: 17, extreme: 20 },
    { normal: 11, good: 16, extreme: 20 },
    { normal: 10, good: 16, extreme: 19 },
    { normal: 9, good: 16, extreme: 19 },
    { normal: 8, good: 15, extreme: 19 },
    { normal: 7, good: 14, extreme: 19 },
    { normal: 6, good: 14, extreme: 18 },
    { normal: 5, good: 13, extreme: 18 },
    { normal: 4, good: 13, extreme: 18 },
    { normal: 3, good: 12, extreme: 18 },
    { normal: 2, good: 12, extreme: 18 },
    { normal: 1, good: 11, extreme: 17 },
  ]

  const type = table[ability - 1]

  if (type.extreme) {
    if (dice >= type.extreme) return 'Extremo'
    if (dice >= type.good) return 'Sucesso Bom'
    if (dice >= type.normal) return 'Sucesso Normal'
    if (dice <= type.normal) return 'Fracasso'
  } else if (type.good) {
    if (dice >= type.good) return 'Sucesso Bom'
    if (dice >= type.normal) return 'Sucesso Normal'
    if (dice <= type.normal) return 'Fracasso'
  } else if (type.normal) {
    if (dice >= type.normal) return 'Sucesso Normal'
    if (dice <= type.normal) return 'Fracasso'
  }
}

function rollDice(dice) {
  let [count, max] = dice.split('d')

  if (Number(count) && Number(max)) {
    count = Number(count)
    max = Number(max)

    let total = 0

    for (let i = 0; i < count; i++) {
      total += Math.floor(Math.random() * max + 1)
    }

    return total
  } else {
    return null
  }
}

function openModal(modal) {
  const Modal = $(modal)
  Modal.css('display', 'block')
}

function closeModal(modal) {
  const Modal = $(modal)
  Modal.css('display', 'none')
}

function addWeaponToTable(weapon, id) {
  const newWeapon = $(`<tr id="weapon_${id}">
        <td>
            <button onclick="deleteWeapon(${id})">
                <i class="fa fa-trash-o trashcan"></i>
            </button>
            ${weapon.name}
        </td>
        <td>${weapon.type}</td>
        <td>${weapon.damage}</td>
        <td>${weapon.numCurrent}</td>
        <td>${weapon.numMax}</td>
        <td>${weapon.attack}</td>
        <td>${weapon.reach}</td>
        <td>${weapon.defect}</td>
        <td>${weapon.area}</td>
    </tr>`)
  $('table#weapons').append(newWeapon)
}

function addAttribute(attribute, id) {
  const newAttribute = $(`<div class="attribute" id="attribute_${id}">
    <a onclick="rollAtribute('${attribute.type}', ${attribute.amount})">
      <img class="attributeDice" src="./img/dado.png" alt="Dado">
    </a>
    <h3>${attribute.type}</h3>
    <input type="text" name="appearance" value="${attribute.amount}" id="attribute_input_${id}" disabled>
  </div>`)
  $('#attributesList').append(newAttribute)
}

function deleteWeapon(id) {
  $(`tr#${id}`).remove()
}
