const { expect, assert } = require("chai")
const { ethers } = require("hardhat")

describe("SimpleStorage", function () {
  let SimpleStorageFactory, SimpleStorage

  beforeEach(async function () {
    SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
    SimpleStorage = await SimpleStorageFactory.deploy()
  })

  it("Should return favorite number as 0 initially", async function () {
    const favNum = await SimpleStorage.retrieve()
    const expectedval = "0"
    expect(favNum.toString()).to.equal(expectedval)
  })

  it("Should update when we call store", async function () {
    const transResponse = await SimpleStorage.store(9)
    await transResponse.wait(1)

    const favNum = await SimpleStorage.retrieve()
    const expectedval = "9"
    assert.equal(favNum.toString(), expectedval)
  })

  it("Should work correctly with the people struct and array", async function () {
    const expectedPersonName = "Ranjith"
    const expectedFavoriteNumber = "3"
    const transactionResponse = await SimpleStorage.addPerson(
      expectedPersonName,
      expectedFavoriteNumber
    )
    await transactionResponse.wait(1)
    const { favoriteNumber, name } = await SimpleStorage.people(0)

    assert.equal(name, expectedPersonName)
    assert.equal(favoriteNumber, expectedFavoriteNumber)
  })
})
