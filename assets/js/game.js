// page loads function
$(document).ready(function() {

	// define the object
	var luke = {
		nickName: 'luke',
		name: 'Luke Skywalker',
		health: 100,
		attack: 8,
		image: '<img src="assets/images/Luke.jpg" class="img-fluid">'
	};

	var maul = {
		nickName: 'maul',
		name: 'Darth Maul',
		health: 130,
		attack: 10,
		image: '<img src="assets/images/DarthMaul.jpg" class="img-fluid">'
	};

	var yoda = {
		nickName: 'yoda',
		name: 'Master Yoda',
		health: 150,
		attack: 2,
		image: '<img src="assets/images/MasterJoda.jpg" class="img-fluid">'
	};

	var kilo = {
		nickName: 'kilo',
		name: 'Kilo Ren',
		health: 80,
		attack: 7,
		image: '<img src="assets/images/KiloRen.jpg" class="img-fluid">'
	};

	var charactersObjects = [luke, maul, yoda, kilo];
	var characters = [];
	var $yourCharacter;
	var $currentEnemy;
	// Your Character's health and attack
	var yourHealth;
	var yourAttack;
	// current's enemy's health and attack
	var currentEnemyHealth = 0;
	var currentEnemyAttack = 0;

	var counter = 0;
	var compoundAttack = 0;
	var isThereOpponent = false;

    //Game start function
	function startGame() {
		createCharacters(charactersObjects);
		pickYourCharacter();
		pickYourOpponent();
	}


	// create character function
	function createCharacters(arg) {
		if (arg.length === 4 ) {

			for ( var i = 0; i < arg.length; i++) {

				// jQuery Object that takes the attributes of each character
				var $character = $('<div id='+arg[i].nickName+'>');
				$character.append('<div class="characterName">'+arg[i].name);
				$character.append(arg[i].image);
				$character.append('<div class="characterHealth">'+arg[i].health);
				$character.attr('data_nickName', arg[i].nickName);
				$character.attr("data_name", arg[i].name);
				$character.attr('data_attack', arg[i].attack);
				$character.attr('data_health', arg[i].health);
				$character.attr('class', 'character col-md-3');

				characters.push(arg[i].nickName);

				$('#characters').append($character);

				}
			}

			else if (arg.length <= 3 ) {
				$('#remainingEnemies').empty()
				characters = [];
				$('#remainingEnemies').append('<div class="title">Remaining Enemies</div>')
				for ( var i = 0; i < arg.length; i++) {

					// jQuery Object that takes the attributes of each character
					var $character = $('<div id='+arg[i].nickName+'>');
					$character.append('<div class="characterName">'+arg[i].name);
					$character.append(arg[i].image);
					$character.append('<div class="characterHealth">'+arg[i].health);
					$character.attr('data_nickName', arg[i].nickName);
					$character.attr("data_name", arg[i].name);
					$character.attr('data_attack', arg[i].attack);
					$character.attr('data_health', arg[i].health);
					$character.attr('class', 'enemy');

					characters.push(arg[i].nickName);

					$('#remainingEnemies').append($character);
				}

				if (!$currentEnemy) {
					pickYourOpponent();
				}
			}

	}; // CLOSING createCharacter

	// Pick your Character function
	function pickYourCharacter() {

		$('.character').on('click', function() {
			$('#characters').empty();
			$('#characters').append('<div class="title">Your Character</div>')

			$yourCharacter = $(this);
			$yourCharacter.addClass('yourCharacter col-md-4 ');
			$yourCharacter.removeClass('col-md-3 character');

			yourHealth = parseInt($yourCharacter.attr('data_health'));
			yourAttack = parseInt($yourCharacter.attr('data_attack'));

			$('#characters').append($yourCharacter);

			$('#remainingEnemies').append('<div class="title">Pick Your Enemy</div>');
			
			var indexRemove = characters.indexOf($yourCharacter.attr('data_nickName'))
			charactersObjects.splice(indexRemove, 1);

			createCharacters(charactersObjects);

		});
		$("#your-score-detail").css("display","none");
        $("#enemy-score-detail").css("display","none");
	};

	//Pick your opponent function
	function pickYourOpponent() {

			$('.enemy').on('click', function() {
				$('#characters').empty();
				$('#currentEnemy').empty();
				$('#fightButton').empty();

				// enemy picked
				$currentEnemy = $(this);

				$currentEnemy.addClass('currentEnemy');
				$currentEnemy.removeClass('enemy');

				// append your character and enemy picked to the fighting area
				$yourCharacter.removeClass("col-md-4");
				$('#yourCharacter').append($yourCharacter);

				$('#fightButton').append('<button type="button" class="btn btn-warning" id="attack-btn">Attack</button>')

				$('#currentEnemy').append($currentEnemy);
				isThereOpponent = true;


				var indexRemove = characters.indexOf($currentEnemy.attr('data_nickName'));
				charactersObjects.splice(indexRemove, 1);

				createCharacters(charactersObjects);

				currentEnemyAttack = 0;
				console.log(currentEnemyAttack);

				// Your enemy's health and attack
				currentEnemyAttack = parseInt($currentEnemy.attr('data_attack'));
				// console.log("CURRENT ENEMY ATTACK: ", currentEnemyAttack);
				currentEnemyHealth = parseInt($currentEnemy.attr('data_health'));

				console.log('IS THERE OPPONENT: ' + isThereOpponent)

				// Check if there is an opponent
				$('#attack-btn').on('click', function() {
					if (isThereOpponent) {
						fight();
					} else {
						alert('PLEASE PICK AN OPPONENT');
					}
				});
			});
	};

    // fight function
	function fight() {

			counter++;

			compoundAttack += yourAttack;
			console.log("COMPOUND ATTACK: ", compoundAttack);

			// After attack
			currentEnemyHealth = currentEnemyHealth - compoundAttack;
			yourHealth = yourHealth - currentEnemyAttack;
			console.log("CURRENT ENEMY ATTACK: ", currentEnemyAttack);
			console.log("ENEMY HEALTH: ",currentEnemyHealth);
			console.log("YOUR HEALTH: ",yourHealth);


			$('.currentEnemy > .characterHealth').html(currentEnemyHealth).animate({
				fontSize: 23,
				color: '#FF0000'
			}, 300, function() {
				$(this).animate({
					fontSize: 20,
					color: 'white'
				}, 300);
			});
			$('.yourCharacter > .characterHealth').html(yourHealth).animate({
				fontSize: 23,
				color: '#FF0000'
			}, 300, function() {
				$(this).animate({
					fontSize: 20,
					color: 'white'
				}, 300);
			});

			if (currentEnemyHealth <= 0 && yourHealth > 0) {

				isThereOpponent = false;
				yourHealth = yourHealth - currentEnemyAttack;

				//console.log("YOU HAVE DEFEATED " + $currentEnemy.attr('data_nickName'));
				//console.log('IS THERE OPPONENT: ' + isThereOpponent)

				$('#currentEnemy').empty();

				// currentEnemyAttack = 0;

				if (characters.length === 0) {
					alert("Congrats, You WON THE GAME!");
					restartGame();
				} else {
					pickYourOpponent();
				};
			}

			else if (yourHealth <= 0) {
				alert("You have been defeated");
				alert("try again");
				restartGame();
			};

		    
			$("#your-score-detail").css("display","block");
			$("#enemy-score-detail").css("display","block");
			$(".enemy-char").text($currentEnemy.attr('data_nickName'));
			$(".your-ap").text(yourAttack);
			$(".enemy-ap").text(currentEnemyAttack)
	};

	function restartGame() {
		$('.row').empty();
		$('.restart').append('<button class="restartBtn btn btn-lg btn-warning">Restart Game</button>');
			$('.restartBtn').on('click', function() {
				location.reload();
			})
	}

	startGame();

}); 