$(document).ready(function(){

    const data = {
        name: "Claudio",
        player: "Ryan",
        occupation: "Caçador",
        age: 21,
        sex: "male",
        birthplace: "São paulo",
        residence: "São paulo",

        life: {
            current: 11,
            max: 11,
        },
        sanity: {
            current: 32,
            max: 40,
        },

        weapons: [
            {
                name: "Balestra",
                type: "Arco",
                damege: "1d20",
                numCurrent: 1,
                numMax: 1,
                attack: 5,
                reach: "10 m",
                defect: 1,
                area: "",
            },
            {
                name: "Canivite",
                type: "Briga",
                damege: "1d10",
                numCurrent: "",
                numMax: "",
                attack: "1/2",
                reach: "",
                defect: 1,
                area: "",
            },
        ],
    }

    data.weapons.map((weapon, index) => {
        addWeaponToTable(weapon, index);
    });


    $("#name").val(data.name);
    $("#player").val(data.player);
    $("#occupation").val(data.occupation);
    $("#age").val(data.age);
    $("#sex").val(data.sex);
    $("#birthplace").val(data.birthplace);
    $("#residence").val(data.residence);

    $(".lifeBar").css("width", `${calculateBar(data.life.current, data.life.max)}%`);
    $(".sanityBar").css("width", `${calculateBar(data.sanity.current, data.sanity.max)}%`);


    const diceModal = $("#diceAttributes");
    const lifeModal = $("#lifeModal");
    const sanityModal = $("#sanityModal");

    $(window).click(function(event) {
        if (event.target.id == "diceAttributes") {
            diceModal.css("display", "none");
            $("#diceNumber").text("");
            $("#diceType").text("");

            $(".modalDice").css("transform", "rotate(0deg)");
            $(".modalDice").css("-webkit-transform", "rotate(0deg)");
        }else if (event.target.id == "lifeModal") {
            lifeModal.css("display", "none");
        }else if (event.target.id == "sanityModal") {
            sanityModal.css("display", "none");
        }else if (event.target.id == "addWeaponModal") {
            closeModal("#addWeaponModal");
        }
    });

    $("#btn").click(function(){

        console.log(this)

        diceModal.css("display", "block");

        setTimeout(() => {
            $(".modalDice").css("transform", "rotate(360deg)");
            $(".modalDice").css("-webkit-transform", "rotate(360deg)");
        }, 1000);

        setTimeout(() => {

            var diceNumber = Math.floor(Math.random() * 21);
            $("#diceNumber").text(diceNumber);
            $("#diceType").text("BOM");

            setTimeout(() => {
                diceModal.css("display", "none");
                $("#diceNumber").text("");
                $("#diceType").text("");

                $(".modalDice").css("transform", "rotate(0deg)");
                $(".modalDice").css("-webkit-transform", "rotate(0deg)");
            }, 20000);
        }, 2000);
    });

    $(".lifeBar").click(function(){

        console.log(this);
        lifeModal.css("display", "block");
    });

    $(".sanityBar").click(function(){

        console.log(this);
        sanityModal.css("display", "block");
    });

    $("#addWeapon").click(function(){
        openModal("#addWeaponModal");
    });

    $('#lesion').change(function() {
        if(this.checked) {
            console.log('Modo lesionamendo grave ativado!');
        }else {
            console.log('Modo lesionamendo grave desativado!');
        } 
    });

    $('#injury').change(function() {
        if(this.checked) {
            console.log('Modo lesionamendo ativado!');
        }else {
            console.log('Modo lesionado desativado!');
        } 
    });

    $('#dying').change(function() {
        if(this.checked) {
            console.log('Modo morrendo ativado!');
        }else {
            console.log('Modo morrendo desativado!');
        } 
    });

    $('#traumatized').change(function() {
        if(this.checked) {
            console.log('Modo traumatizado ativado!');
        }else {
            console.log('Modo traumatizado desativado!');
        } 
    });

    $('#crazed').change(function() {
        if(this.checked) {
            console.log('Modo enlouquecido ativado!');
        }else {
            console.log('Modo enlouquecido desativado!');
        } 
    });

    $('#addWeaponForm').submit(function( event ) {

        var weaponType = "";

        if($("#weaponType").val() == "fire"){
            weaponType = "Fogo";
        }else if($("#weaponType").val() == "arch") {
            weaponType = "Arco";
        }else if($("#weaponType").val() == "fight") {
            weaponType = "Briga";
        }

        const weapon = {
            name: $("#weaponName").val(),
            type: weaponType,
            damege: $("#weaponDamege").val(),
            numCurrent: $("#weaponNumCurrent").val(),
            numMax: $("#weaponNumMax").val(),
            attack:$("#weaponAttack").val(),
            reach: $("#weaponReach").val(),
            defect: $("#weaponDefect").val(),
            area: $("#weaponArea").val(),
        }

        data.weapons.push(weapon);
        const id = data.weapons.length-1;
        addWeaponToTable(weapon, id);

        closeModal("#addWeaponModal");
        event.preventDefault();
    });
});

function calculateBar(current, max){
    if (current > max){
        return 100;
    } else if (current < 0) {
        return 0;
    } else {
        const value = (100/max)*current;
        const string = value.toString().split(".")[0];
        const percentage = Number(string);
        return percentage;
    }
}

function openModal(modal){
    const Modal = $(modal);
    Modal.css("display", "block");
}

function closeModal(modal){
    const Modal = $(modal);
    Modal.css("display", "none");
}

function addWeaponToTable(weapon, id) {
    const newWeapon = $(`<tr id="${id}">
        <td>
            <button onclick="deleteWeapon(${id})">
                <i class="fa fa-trash-o trashcan"></i>
            </button>
            ${weapon.name}
        </td>
        <td>${weapon.type}</td>
        <td>${weapon.damege}</td>
        <td>${weapon.numCurrent}</td>
        <td>${weapon.numMax}</td>
        <td>${weapon.attack}</td>
        <td>${weapon.reach}</td>
        <td>${weapon.defect}</td>
        <td>${weapon.area}</td>
    </tr>`);
    $("table#weapons").append(newWeapon);
}

function deleteWeapon(id) {
    $(`tr#${id}`).remove();
}