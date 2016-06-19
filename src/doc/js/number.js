(function() {
	var params = {
		speed: 0.5,
	};
	var pane = new Tweakpane({
		foldable: false,
		container: document.getElementById('numberExample')
	});
	pane.add(params, 'speed');
})();

(function() {
	var params = {
		speed: 50
	};
	var pane = new Tweakpane({
		foldable: false,
		container: document.getElementById('minExample')
	});
	pane.add(params, 'speed', {min: 0});
})();

(function() {
	var params = {
		speed: 50
	};
	var pane = new Tweakpane({
		foldable: false,
		container: document.getElementById('sliderExample')
	});
	pane.add(params, 'speed', {min: 0, max: 100});
})();

(function() {
	var params = {
		particleCount: 50
	};
	var pane = new Tweakpane({
		foldable: false,
		container: document.getElementById('stepExample')
	});
	pane.add(params, 'particleCount', {min: 0, max: 100, step: 10});
})();

(function() {
	var params = {
		direction: 0,
		'(value)': ''
	};
	var pane = new Tweakpane({
		foldable: false,
		container: document.getElementById('listExample')
	});
	pane.add(params, 'direction', {
		list: {
			none: 0,
			horizontal: 1,
			vertical: 2,
			both: 3
		}
	}).on('change', function(value) {
		params['(value)'] = String(value);
	});;
	pane.monitor(params, '(value)');
})();
