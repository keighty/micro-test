const IdGenerator = require('../data/id_generator')

describe('IdGenerator', () => {
  it('should return an Id', () => {
    const incrementor = new IdGenerator()
    expect(incrementor.current).toEqual('00000')
  })

  it('should increment an id', () => {
    const incrementor = new IdGenerator()
    incrementor.next
    expect(incrementor.current).toEqual('00001')
    incrementor.next
    expect(incrementor.current).toEqual('00002')
    incrementor.next
    expect(incrementor.current).toEqual('00003')
    incrementor.next
    expect(incrementor.current).toEqual('00004')
  })
})
