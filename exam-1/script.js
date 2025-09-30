// Stopwatch App JavaScript
class Stopwatch {
	constructor() {
		this.startTime = 0;
		this.elapsedTime = 0;
		this.timerInterval = null;
		this.isRunning = false;
		this.lapTimes = [];

		// DOM elements
		this.timeDisplay = document.getElementById('time-display');
		this.millisecondsDisplay = document.getElementById('milliseconds');
		this.startBtn = document.getElementById('start-btn');
		this.stopBtn = document.getElementById('stop-btn');
		this.resetBtn = document.getElementById('reset-btn');
		this.lapBtn = document.getElementById('lap-btn');
		this.lapList = document.getElementById('lap-list');
		this.themeToggle = document.getElementById('theme-toggle');

		this.initializeEventListeners();
		this.updateDisplay();
	}

	initializeEventListeners() {
		this.startBtn.addEventListener('click', () => this.start());
		this.stopBtn.addEventListener('click', () => this.stop());
		this.resetBtn.addEventListener('click', () => this.reset());
		this.lapBtn.addEventListener('click', () => this.lap());
		this.themeToggle.addEventListener('click', () => this.toggleTheme());

		// Keyboard shortcuts
		document.addEventListener('keydown', (e) => {
			switch (e.code) {
				case 'Space':
					e.preventDefault();
					if (this.isRunning) {
						this.stop();
					} else {
						this.start();
					}
					break;
				case 'KeyR':
					e.preventDefault()
					this.reset();
					break;
				case 'KeyL':
					e.preventDefault();
					this.lap();
					break;
			}
		});
	}

	start() {
		if (!this.isRunning) {
			this.startTime = Date.now() - this.elapsedTime;
			this.timerInterval = setInterval(() => this.updateTime(), 10);
			this.isRunning = true;
			this.updateButtonStates();
		}
	}

	stop() {
		if (this.isRunning) {
			clearInterval(this.timerInterval);
			this.isRunning = false;
			this.updateButtonStates();
		}
	}

	reset() {
		this.stop();
		this.elapsedTime = 0;
		this.lapTimes = [];
		this.updateDisplay();
		this.updateLapList();
		this.updateButtonStates();
	}

	lap() {
		if (this.isRunning) {
			const currentTime = this.elapsedTime;
			const lapTime = this.lapTimes.length === 0 ?
				currentTime :
				currentTime - this.lapTimes.reduce((sum, lap) => sum + lap, 0);

			this.lapTimes.push(lapTime);
			this.updateLapList();
		}
	}

	updateTime() {
		this.elapsedTime = Date.now() - this.startTime;
		this.updateDisplay();
	}

	updateDisplay() {
		const time = this.formatTime(this.elapsedTime);
		this.timeDisplay.textContent = time.formatted;
		this.millisecondsDisplay.textContent = time.milliseconds;
	}

	formatTime(milliseconds) {
		const totalSeconds = Math.floor(milliseconds / 1000);
		const hours = Math.floor(totalSeconds / 3600);
		const minutes = Math.floor((totalSeconds % 3600) / 60);
		const seconds = totalSeconds % 60;
		const ms = Math.floor((milliseconds % 1000) / 10);

		return {
			formatted: `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`,
			milliseconds: ms.toString().padStart(3, '0')
		};
	}

	updateLapList() {
		this.lapList.innerHTML = '';

		if (this.lapTimes.length === 0) {
			const emptyItem = document.createElement('li');
			emptyItem.textContent = 'No lap times recorded';
			emptyItem.className = 'lap-item';
			emptyItem.style.fontStyle = 'italic';
			emptyItem.style.opacity = '0.7';
			this.lapList.appendChild(emptyItem);
			return;
		}

		this.lapTimes.forEach((lapTime, index) => {
			const lapItem = document.createElement('li');
			const formattedLap = this.formatTime(lapTime);
			lapItem.textContent = `Lap ${index + 1}: ${formattedLap.formatted}.${formattedLap.milliseconds}`;
			lapItem.className = 'lap-item';
			this.lapList.appendChild(lapItem);
		});
	}

	updateButtonStates() {
		this.startBtn.disabled = this.isRunning;
		this.stopBtn.disabled = !this.isRunning;
		this.lapBtn.disabled = !this.isRunning;

		if (this.isRunning) {
			this.startBtn.style.opacity = '0.6';
			this.stopBtn.style.opacity = '1';
			this.lapBtn.style.opacity = '1';
		} else {
			this.startBtn.style.opacity = '1';
			this.stopBtn.style.opacity = '0.6';
			this.lapBtn.style.opacity = '0.6';
		}
	}

	toggleTheme() {
		document.body.classList.toggle('dark-theme');
		const isDark = document.body.classList.contains('dark-theme');
		this.themeToggle.textContent = isDark ? '☀️' : '🌙';

		// Save theme preference
		localStorage.setItem('stopwatch-theme', isDark ? 'dark' : 'light');
	}

	loadTheme() {
		const savedTheme = localStorage.getItem('stopwatch-theme');
		if (savedTheme === 'dark') {
			document.body.classList.add('dark-theme');
			this.themeToggle.textContent = '☀️';
		}
	}
}

// Initialize the stopwatch when the page loads
document.addEventListener('DOMContentLoaded', () => {
	const stopwatch = new Stopwatch();
	stopwatch.loadTheme();

	// Add some visual feedback for button interactions
	const buttons = document.querySelectorAll('.btn');
	buttons.forEach(button => {
		button.addEventListener('mousedown', () => {
			button.style.transform = 'translateY(1px)';
		});

		button.addEventListener('mouseup', () => {
			button.style.transform = 'translateY(-2px)';
		});

		button.addEventListener('mouseleave', () => {
			button.style.transform = 'translateY(0)';
		});
	});

	// Add instructions tooltip
	const instructions = document.createElement('div');
	instructions.innerHTML = `
        <div style="position: fixed; bottom: 20px; right: 20px; background: rgba(0,0,0,0.8); color: white; padding: 10px; border-radius: 5px; font-size: 12px; max-width: 200px;">
            <strong>Keyboard Shortcuts:</strong><br>
            Space: Start/Stop<br>
            R: Reset<br>
            L: Lap
        </div>
    `;
	document.body.appendChild(instructions);

	// Hide instructions after 5 seconds
	setTimeout(() => {
		instructions.style.opacity = '0';
		setTimeout(() => instructions.remove(), 500);
	}, 5000);
});
