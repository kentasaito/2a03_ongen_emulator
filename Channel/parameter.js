// デューティ比
Channel.prototype.duty_hi = function(frame, atai) {
	this.parameter.duty_hi = atai;

	this.oscillator.stop(frame / this.fps);
	this.oscillator = this.audio_context.createOscillator();
	this.oscillator.setPeriodicWave(this.hakei[atai]);
	this.oscillator_shuhasu(frame, this.parameter.shuhasu);
	this.oscillator.connect(this.gain);
	this.oscillator.start(frame / this.fps);
};

// 音量
Channel.prototype.onryo = function(frame, atai) {
	this.parameter.onryo = atai;
	if (this.keyon_chu(frame)) {
		if (!this.parameter.envelope_flag) {
			this.gain_onryo(frame, this.parameter.onryo);
		} else {
			this.gain_envelope(frame, this.parameter.onryo);
		}
	}
};

// 周波数
Channel.prototype.shuhasu = function(frame, atai) {
	this.parameter.shuhasu = atai;
	if (this.keyon_chu(frame)) {
		this.oscillator_shuhasu(frame, atai);
	}
};

// キーオフフラグ
Channel.prototype.keyoff_flag = function(frame, atai) {
	this.parameter.keyoff_flag = atai;
	clearTimeout(this.envelope_timeout_id);
	if (this.keyon_chu(frame) && !this.parameter.envelope_flag) {
		this.keyon(frame);
	}
};

// キーオフカウント
Channel.prototype.keyoff_count = function(frame, atai) {
	this.parameter.keyoff_count = atai;
};

// エンベロープフラグ
Channel.prototype.envelope_flag = function(frame, atai) {
	this.parameter.envelope_flag = atai;
	if (this.keyon_chu(frame)) {
		this.keyon(frame);
	}
};

// スイープフラグ
Channel.prototype.sweep_flag = function(frame, atai) {
	this.parameter.sweep_flag = atai;
};

// スイープカウント
Channel.prototype.sweep_count = function(frame, atai) {
	this.parameter.sweep_count = atai;
};

// スイープ量
Channel.prototype.sweep_ryo = function(frame, atai) {
	this.parameter.sweep_ryo = atai;
};
