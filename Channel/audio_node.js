// ゲイン音量
Channel.prototype.gain_onryo = function(frame, onryo) {
	this.gain.gain.setValueAtTime(onryo / 15, frame / this.fps);
};

// ゲインエンベロープ
Channel.prototype.gain_envelope = function(frame, envelope_count) {
	this.gain_onryo(frame, 15);
	this.gain.gain.linearRampToValueAtTime(0, (frame + (envelope_count + 1) * 4) / this.fps);
	if (!this.parameter.keyoff_flag) {
		this.envelope_timeout_id = setTimeout(() => {
			this.gain_envelope(frame + (envelope_count + 1) * 4, envelope_count);
		}, ((frame + (envelope_count + 1) * 4 - 4) / this.fps - this.audio_context.currentTime) * 1000);
	}
};

// オシレータ周波数
Channel.prototype.oscillator_shuhasu = function(frame, shuhasu) {
	this.oscillator.frequency.setValueAtTime(shuhasu, frame / this.fps);
};

// オシレータスイープ
Channel.prototype.oscillator_sweep = function(frame, shuhasu, sweep_count, sweep_keisu) {
	this.oscillator_shuhasu(frame, shuhasu);
	shuhasu *= sweep_keisu;
	if (shuhasu < 10000 && shuhasu > 100) {
		this.sweep_timeout_id = setTimeout(() => {
			this.oscillator_sweep(frame + (sweep_count + 1) / 2, shuhasu, sweep_count, sweep_keisu);
		}, ((frame + (sweep_count + 1) / 2 - 4) / this.fps - this.audio_context.currentTime) * 1000);
	} else {
		this.keyoff(frame);
	}
};

