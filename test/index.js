const DeepClone = require('../src/index.js')
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')

chai.use(sinonChai)
const assert = chai.assert;

describe('deepclone的功能', () => {
    it('deepClone是一个类',()=>{
        assert.isFunction(DeepClone)
    })
    it ('可以复制6种基本类型',()=>{
        //数字克隆
        let num = 123;
        let cnum = new DeepClone().clone(num)
        assert.isTrue(num === cnum)
        //字符串
        let str = '222'
        let cstr = new DeepClone().clone(str)
        assert.isTrue(str === cstr)

        let bool = true
        let cbool = new DeepClone().clone(bool)
        assert.isTrue(bool === cbool)

        let n = null
        let cn = new DeepClone().clone(n)
        assert.isTrue(n === cn) 

        let un = undefined;
        let cun = new DeepClone().clone(un)
        assert.isTrue(un === cun) 

        let sym = Symbol('2');
        let csym = new DeepClone().clone(sym)
        assert.isTrue(sym === csym) 
    })
    describe('可以复制object类型',()=>{
        it('能够复制普通对象',()=>{
            let obj = {
                name:'xiaoming',
                child: {
                    name: 'xiaoxiaoming'
                }
            }
            let cobj = new DeepClone().clone(obj)
            assert.isTrue(obj !== cobj)
            assert.isTrue(obj.name === cobj.name)
            assert.isTrue(obj.child !== cobj.child)
            assert.isTrue(obj.child.name === cobj.child.name)            
        })
        it('能够复制数组对象',()=>{
            let obj = [[11,12],[21,22],[31,32]]
            let cobj = new DeepClone().clone(obj)
            assert(obj !== cobj)
            assert(obj[0] !== cobj[0])
            assert(obj[1] !== cobj[1])
            assert(obj[2] !== cobj[2])
            assert.deepEqual(obj,cobj)              
        })
        it ('可以复制函数',()=>{
            let a1 = function(x,y) {
                return x+y
            }
            a1.xxx = {
                yyy: {
                    zzz: 1
                }
            }
            let a2 = new DeepClone().clone(a1)
            assert(a1 !== a2)
            assert(a1.xxx !== a2.xxx)
            assert(a1.xxx.yyy !== a2.xxx.yyy)
            assert(a1.xxx.zzz === a2.xxx.zzz)
            assert(a1(1,2) === a2(1,2))
        })
        it('环也可以复制',()=>{
            const a = {
                name: 'hello'
            }
            a.self = a;
            const b = new DeepClone().clone(a)
            assert(a !== b)
            assert(a.name === b.name)
            assert(a.self !== b.self)

        })
        xit('嵌套很深也不会爆栈',()=>{
           const a = {child: null};
           let b = a;
           for (let i = 0; i < 20000; i++) {
               b.child = {
                   child: null
               }
               b = b.child;
           }
           console.log(a)
        })
        it('可以拷贝正则',()=>{
            const a = /\s+/g;
            a.x = {yyy:{zzz: 111}}
            const b = new DeepClone().clone(a)
            assert(a !== b)
            assert(a.source === b.source)
            assert(a.flags === b.flags) 

            assert(a.x.yyy.zzz === b.x.yyy.zzz)
            assert(a.x !== b.x)
        })
        it('可以拷贝date',()=>{
            const a = new Date()
            a.x = {yyy:{zzz: 111}}
            const b = new DeepClone().clone(a)

            assert(a !== b)
            assert(a.getTime() === b.getTime())
            assert(a.x.yyy.zzz === b.x.yyy.zzz)
            assert(a.x !== b.x)
        })
    })
});
