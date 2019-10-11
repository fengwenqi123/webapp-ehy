interface NoParamConstructor<T> {
  new(): T;
}

export default class EditRow<T> {
  origin: T = null
  copy: T = null
  is_edit: boolean = false
  ctor: NoParamConstructor<T>;

  constructor(ctor: NoParamConstructor<T>, origin: T) {
    this.ctor = ctor
    this.origin = origin
    this.show_edit = this.show_edit.bind(this)
    this.save = this.save.bind(this)
  }
  show_edit() {
    this.copy = Object.assign(new this.ctor(), this.origin)
    this.is_edit = true
  }
  save() {
    this.origin = this.copy
    this.is_edit = false
  }
}
