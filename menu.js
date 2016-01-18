function hit(mx, my) {
    return mx >= this.x && my >= this.y && mx < this.x + this.w && my < this.y + this.h;
};

var Button = function(text, fn) {
    this.x = 0;
    this.y = 0;
    this.w = 100;
    this.h = 50;
    this.text = text;
    this.color = "rgba(100, 155, 155, 0.90)";
    this.bordercolor = "rgba(200, 200, 200, 0.90)";
    this.font = "32px Arial";
    this.fontcolor = "rgba(255, 255, 255, 1.0)";
    this.hit = hit.bind(this);
    this.fn = fn;
};

Button.prototype.mouse_down = function(mx, my) {
    if (this.hit(mx, my)) {
        this.fn();
        return true;   
    }
};

Button.prototype.draw = function(ctx, offsetx, offsety) {
    ctx.strokeStyle = this.bordercolor;
    ctx.lineWidth = 2;
    ctx.strokeRect(this.x + offsetx, this.y + offsety, this.w, this.h); 
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x + offsetx, this.y + offsety, this.w, this.h);
    ctx.fillStyle = this.fontcolor;
    ctx.textBaseline = "top";
    ctx.font = this.font;
    ctx.fillText(this.text, this.x + offsetx, this.y + offsety);
};

var Menu = function(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = "rgba(100, 100, 100, 0.90)";
    this.bordercolor = "rgba(200, 200, 200, 0.90)";
    this.controls = [];
    this.hit = hit.bind(this);
};

Menu.prototype.add = function(control) {
    this.controls.push(control);
    
    this.controls.forEach(function(c, i) {
        var height = this.h / this.controls.length;
        c.x = 0;
        c.y = i * height;
        c.w = this.w; 
        c.h = height;
    }, this);
};

Menu.prototype.mouse_down = function(mx, my) {
    var controlclicked = this.controls.some(function(c) {
        return c.mouse_down(mx - this.x, my - this.y);
    }, this);
    
    if (!controlclicked && this.hit(mx, my)) {
        return true;
    }
};

Menu.prototype.draw = function(ctx) {
    ctx.strokeStyle = this.bordercolor;
    ctx.lineWidth = 2;
    ctx.strokeRect(this.x, this.y, this.w, this.h); 
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.w, this.h);
    
    this.controls.forEach(function(c) {
       c.draw(ctx, this.x, this.y);
    }, this);
};