// チャンネル
const Channel = function() {
	// FPS
	this.fps = 60;

	// オーディオコンテキスト
	this.audio_context = new AudioContext();

	// 波形
	this.hakei = {};
	[0.125, 0.5, 0.25, 0.75].forEach(duty_hi => {
		const real = new Float32Array(33);
		const imag = new Float32Array(33);
		real[0] = 0;
		imag[0] = 0;
		for (n = 1; n < 32; n++) {
			real[n] = Math.sin(n * duty_hi * Math.PI) / (10 * n);
			imag[n] = 0;
		}
		this.hakei[duty_hi * 100 + '%'] = this.audio_context.createPeriodicWave(real, imag, {disableNormalization: true});
	});

	// パラメータ
	this.parameter = {
		duty_hi: '50%',
		onryo: 15,
		shuhasu: 436.96,
		keyoff_flag: false,
		keyoff_count: 127,
		envelope_flag: false,
		sweep_flag: false,
		sweep_count: 7,
		sweep_ryo: 1,
	};

	// フレーム
	this.frame = {
		keyon: 0,
		keyoff: 0,
	};

	// ゲイン
	this.gain = this.audio_context.createGain();
	this.gain.gain.value = 0;
	this.gain.connect(this.audio_context.destination);

	// オシレータ
	this.oscillator = this.audio_context.createOscillator();
	this.oscillator.start();
	this.duty_hi(0, this.parameter.duty_hi);
};
