// set env vars
process.env = {
    // ...process.env,

    // nested
    FOO__BAR__BAZ: '',
    FOO__BAR__BAR: '',
    FOO__BAR_BAZ: '',

    // camelCase
    FOO__Foo__fOo__foo: '',
    FOO_Foo_fOo_foo: '',
    _FOO__BAR_BAZ: '',

    // arrays
    FOO__BAZ__: '123,234,456,678',
    FOO__BAT__: '123, 234, 456, 678'
    // TODO: array split
    // FOO__BAZ__: '123,234,456\,789,678'
}

const env = require('../index')

describe('convertation', () => {
    test('nested: FOO__BAR__BAZ => foo.bar.baz', async () => {
        expect(typeof env.foo.bar.baz).toEqual('string')
    })
    test('nested: FOO__BAR__BAR => foo.bar.bar', async () => {
        expect(typeof env.foo.bar.bar).toEqual('string')
    })
    test('nested: FOO__BAR_BAZ => foo.barBaz', async () => {
        expect(typeof env.foo.barBaz).toEqual('string')
    })
    test('nested: FOO__BAR_BAZ => FOO.BAR_BAZ', async () => {
        expect(typeof env.FOO.BAR_BAZ).toEqual('string')
    })

    test('camelCase: FOO__Foo__fOo__foo => foo.foo.foo.foo', async () => {
        expect(typeof env.foo.foo.foo.foo).toEqual('string')
    })
    test('camelCase: FOO_Foo_fOo_foo => fooFooFooFoo', async () => {
        expect(typeof env.fooFooFooFoo).toEqual('string')
    })
    test('camelCase: _FOO__BAR_BAZ => _foo.barBaz', async () => {
        expect(typeof env._foo.barBaz).toEqual('string')
    })

    test('array: FOO__BAZ__ => foo.baz = []', async () => {
        expect(typeof env.foo.baz).toEqual('object')
        expect(env.foo.baz.length).toEqual(4)
    })
    test('array: FOO__BAT__ => foo.bat = []', async () => {
        expect(typeof env.foo.bat).toEqual('object')
        expect(env.foo.bat.length).toEqual(4)
        expect(env.foo.bat[1]).toEqual('234')
    })
    // test('array: FOO__BAZ__ => foo.baz = [\,]', async () => {
    //   expect(typeof env.foo.baz).toEqual('object')
    //   expect(env.foo.baz.length).toEqual(4)
    //   expect(env.foo.baz[2]).toEqual('456,789')
    // })
})