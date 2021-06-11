// スケジュールキャンセル
Channel.prototype.schedule_cancel = function(frame) {
	clearTimeout(this.keyoff_timeout_id);
	clearTimeout(this.envelope_timeout_id);
	clearTimeout(this.sweep_timeout_id);
	this.gain.gain.cancelScheduledValues(frame / this.fps);
	this.oscillator.frequency.cancelScheduledValues(frame / this.fps);
};

// キーオン
Channel.prototype.keyon = function(frame) {
	this.frame.keyon = frame;
	this.frame.keyoff = null;
	this.schedule_cancel(frame);
	if (this.parameter.keyoff_flag) {
		this.keyoff_timeout_id = setTimeout(() => {
			this.keyoff(frame + this.parameter.keyoff_count);
		}, ((frame + this.parameter.keyoff_count - 4) / this.fps - this.audio_context.currentTime) * 1000);
	}
	if (!this.parameter.envelope_flag) {
		this.gain_onryo(frame, this.parameter.onryo);
	} else {
		this.gain_envelope(frame, this.parameter.onryo);
	}
	if (this.parameter.sweep_flag) {
		const sweep_keisu = (1 << Math.abs(this.parameter.sweep_ryo)) / ((1 << Math.abs(this.parameter.sweep_ryo)) - Math.sign(this.parameter.sweep_ryo));
		this.oscillator_sweep(frame, this.parameter.shuhasu, this.parameter.sweep_count, sweep_keisu);
	}
};

// キーオフ
Channel.prototype.keyoff = function(frame) {
	this.frame.keyoff = frame;
	this.schedule_cancel(frame);
	this.gain_onryo(frame, 0);
};

// キーオン中
Channel.prototype.keyon_chu = function(frame) {
	return frame >= this.frame.keyon && (frame < this.frame.keyoff || this.frame.keyoff === null);
};
