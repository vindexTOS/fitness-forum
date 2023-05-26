import Votes from '../models/upVoteModel.js'

const postUpVote = async (req, res) => {
  let { postID } = req.params
  postID = postID.replace('\n', '')
  console.log(postID)
  try {
    const vote = await Votes.findOne({ postID })

    const existingUserIndex = vote.Votes.findIndex(
      (val) => val.userID === req.body.userID,
    )
    if (existingUserIndex > -1) {
      // User already exists, update the voteType
      vote.Votes[existingUserIndex].voteType = req.body.voteType
    } else {
      // User doesn't exist, add a new entry
      vote.Votes.push({ userID: req.body.userID, voteType: req.body.voteType })
    }

    const updateUpVote = await vote.save()

    return res.status(200).json({ upvote: updateUpVote })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ msg: error })
  }
}

export { postUpVote }
