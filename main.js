// A Wes personality quiz

// This is an array of objects that stores the personality trait that is prompted to the user and the weight for each prompt.
// If a personality trait is considered more QUIET SIDE, it will have a negative weight.
// If a personlity trait is considered more LOUD SIDE, it will have a positive weight.

var prompts = [
{
	prompt: 'I go to the gym',
	weight: 1,
	class: 'group0'
},
{
	prompt: 'I work in Exley',
	weight: 1,
	class: 'group1'
},
{
	prompt: 'I consider myself aloof',
	weight: -1,
	class: 'group2'
},
{
	prompt: 'The best parties are on Fountain',
	weight: -1,
	class: 'group3'
},
{
	prompt: 'I own a pair of Levis',
	weight: -1,
	class: 'group4'
},
{
	prompt: 'Most of my friends are humanities majors',
	weight: -1,
	class: 'group5'
},
{
	prompt: 'I enjoy reading',
	weight: -1,
	class: 'group6'
},
{
	prompt: 'I find it easy to walk up to a group of people and join in conversation',
	weight: 1,
	class: 'group7'
},
{
	prompt: 'I prefer to eat with a small group of friends',
	weight: -1,
	class: 'group8'
},
{
	prompt: 'I think the Wesleyan Covid guidelines are too much',
	weight: 1,
	class: 'group9'
},
{
	prompt: 'I like watching and playing sports',
	weight: 1,
	class: 'group10'
},
{
	prompt: 'When I go out, I prefer dancing with friends than talking in small groups',
	weight: 1,
	class: 'group11'
},
{
	prompt: 'I live or lived in WestCo',
	weight: 1,
	class: 'group12'
},

{
	prompt: 'I often buy second-hand or vintage clothes',
	weight: -1,
	class: 'group13'
},

{
	prompt: 'I prefer smoking to drinking',
	weight: -1,
	class: 'group14'
},

{
	prompt: 'I use Snapchat',
	weight: 1,
	class: 'group15'
},

{
	prompt: 'I would let someone give me a stick and poke',
	weight: -1,
	class: 'group16'
},

{
	prompt: 'I want to be like my dad when I grow up',
	weight: 1,
	class: 'group17'
},

{
	prompt: 'I smoke cigarettes',
	weight: -1,
	class: 'group18'
},

{
	prompt: 'I eat breakfast',
	weight: 1,
	class: 'group19'
},

{
	prompt: 'I came to college to reinvent myself',
	weight: -1,
	class: 'group20'
},

{
	prompt: 'I know what I want to do post-grad',
	weight: 1,
	class: 'group21'
},

{
	prompt: 'I enjoyed Econ101',
	weight: 1,
	class: 'group22'
},


{
	prompt: 'I know what NESCAC stands for',
	weight: 1,
	class: 'group23'
},

]

// This array stores all of the possible values and the weight associated with the value.
// The stronger agreeance/disagreeance, the higher the weight on the user's answer to the prompt.
var prompt_values = [
{
	value: 'Strongly Agree',
	class: 'btn-default btn-strongly-agree',
	weight: 5
},
{
	value: 'Agree',
	class: 'btn-default btn-agree',
	weight: 3,
},
{
	value: 'Neutral',
	class: 'btn-default',
	weight: 0
},
{
	value: 'Disagree',
	class: 'btn-default btn-disagree',
	weight: -3
},
{
	value: 'Strongly Disagree',
	class: 'btn-default btn-strongly-disagree',
	weight: -5
}
]

// For each prompt, create a list item to be inserted in the list group
function createPromptItems() {

	for (var i = 0; i < prompts.length; i++) {
		var prompt_li = document.createElement('li');
		var prompt_p = document.createElement('p');
		var prompt_text = document.createTextNode(prompts[i].prompt);

		prompt_li.setAttribute('class', 'list-group-item prompt');
		prompt_p.appendChild(prompt_text);
		prompt_li.appendChild(prompt_p);

		document.getElementById('quiz').appendChild(prompt_li);
	}
}


function createValueButtons() {
	for (var li_index = 0; li_index < prompts.length; li_index++) {
		var group = document.createElement('div');
		group.className = 'btn-group btn-group-justified';

		for (var i = 0; i < prompt_values.length; i++) {
			var btn_group = document.createElement('div');
			btn_group.className = 'btn-group';

			var button = document.createElement('button');
			var button_text = document.createTextNode(prompt_values[i].value);
			button.className = 'group' + li_index + ' value-btn btn ' + prompt_values[i].class;
			button.appendChild(button_text);

			btn_group.appendChild(button);
			group.appendChild(btn_group);

			document.getElementsByClassName('prompt')[li_index].appendChild(group);
		}
	}
}

createPromptItems();
createValueButtons();

// Keep a running total of the values they have selected. If the total is negative, the user is introverted. If positive, user is extroverted.
// Calculation will sum all of the answers to the prompts using weight of the value * the weight of the prompt.
var total = 0;

// Get the weight associated to group number
function findPromptWeight(prompts, group) {
	var weight = 0;

	for (var i = 0; i < prompts.length; i++) {
		if (prompts[i].class === group) {
			weight = prompts[i].weight;
		}
	}

	return weight;
}

// Get the weight associated to the value
function findValueWeight(values, value) {
	var weight = 0;

	for (var i = 0; i < values.length; i++) {
		if (values[i].value === value) {
			weight = values[i].weight;
		}
	}

	return weight;
}

// When user clicks a value to agree/disagree with the prompt, display to the user what they selected
$('.value-btn').mousedown(function () {
	var classList = $(this).attr('class');
	// console.log(classList);
	var classArr = classList.split(" ");
	// console.log(classArr);
	var this_group = classArr[0];
	// console.log(this_group);

	// If button is already selected, de-select it when clicked and subtract any previously added values to the total
	// Otherwise, de-select any selected buttons in group and select the one just clicked
	// And subtract deselected weighted value and add the newly selected weighted value to the total
	if($(this).hasClass('active')) {
		$(this).removeClass('active');
		total -= (findPromptWeight(prompts, this_group) * findValueWeight(prompt_values, $(this).text()));
	} else {
		// $('[class='thisgroup).prop('checked', false);
		total -= (findPromptWeight(prompts, this_group) * findValueWeight(prompt_values, $('.'+this_group+'.active').text()));
		// console.log($('.'+this_group+'.active').text());
		$('.'+this_group).removeClass('active');

		// console.log('group' + findValueWeight(prompt_values, $('.'+this_group).text()));
		// $(this).prop('checked', true);
		$(this).addClass('active');
		total += (findPromptWeight(prompts, this_group) * findValueWeight(prompt_values, $(this).text()));
	}

	console.log(total);
})



$('#submit-btn').click(function () {
	// After clicking submit, add up the totals from answers
	// For each group, find the value that is active
	$('.results').removeClass('hide');
	$('.results').addClass('show');

	if(total < 0) {
		document.getElementById('results').innerHTML = '<b>You are Quiet Side!</b><br><img src="quietside_1.jpg" class="center" width="500"><br><br>\
Quiet Side individuals are typically much more reserved. Quiet Siders generally prefer to smoke cigarettes, drink wine, and read philosophy with their friends. They tend to dress in more alternative, baggier clothing. \
<br>\
While Quiet Siders do enjoy going to an occassional party on Fountain every now and then, they typically stick to their smaller, more intimate gatherings. \
<br>\
Quiet Siders are known for majoring in the humanities, posting obscure photos of random things to their instagram, and being overly critical of nearly everything.\
		';
	}
    else if(total > 0) {
		document.getElementById('results').innerHTML = '<b>You are Loud Side!</b><br><img src="freeman.jpeg" class="center" width="500"><br>\
		Congratulations! According to our results, you classify as a Loud Sider. \
<br>\
If you???re looking to witness a world record attempt in cup stacking by the basketball team, loud side is the place to be!\
<br>\
Loud side inhabitants are a rowdy crowd often populated by athletes and athlete adjacents.\
<br>\
Loud siders are often found bouncing between exley, fountain and freeman, likely wearing something wesleyan themed. Loud siders can be known to identify their friends based on the sport they play or by using the term ???narp.??? While they may never be going pro, loud siders show intense dedication to their D3 craft and all around school spirit.\
 ';
	} else {
document.getElementById('results').innerHTML = '<b>You Are MoCon Side...</b><br><img src="SS35128_35128_41560526.jpeg" class="center" width="500"><br>\
Before Usdan, there was no "Loud Side" or "Quiet Side." Only MoCon. You would have loved it.\
<br>\
MoCon was a U.F.O. shaped building built around the same time as the Foss dorms, but was torn down in 2010 after Usdan rendered it irrelevant.\
<br>\
In MoCon there were no sides. Only food and community. And a big podium to make announcements. And Joni Mitchell one time.\
<br>\
If you believe in bringing back MoCon, email mroth@wesleyan.edu and let him know how you feel. With your help, we can make this happen.<br>\
<img src="SS35128_35128_39043974.jpg" class="center" width="500">\
<br>\
#savemocon';
}
	// Hide the quiz after they submit their results
	$('#quiz').addClass('hide');
	$('#submit-btn').addClass('hide');
	$('#retake-btn').removeClass('hide');
})

// Refresh the screen to show a new quiz if they click the retake quiz button
$('#retake-btn').click(function () {
	$('#quiz').removeClass('hide');
	$('#submit-btn').removeClass('hide');
	$('#retake-btn').addClass('hide');

	$('.results').addClass('hide');
	$('.results').removeClass('show');
})
