$(document).ready(function () {
	var interval = setInterval(function () {
		var timer = $('.clock').html();
		timer = timer.split(':');
		var minutes = parseInt(timer[0], 10);
		var seconds = parseInt(timer[1], 10);
		seconds -= 1;
		if (minutes < 0) return clearInterval(interval);
		if (minutes < 10 && minutes.length != 2) minutes = '0' + minutes;
		if (seconds < 0 && minutes != 0) {
			minutes -= 1;
			seconds = 59;
		} else if (seconds < 10 && length.seconds != 2) seconds = '0' + seconds;
		$('.clock').html(minutes + ':' + seconds);

		if (minutes == 0 && seconds == 0)
			clearInterval(interval);
	}, 1000);
});