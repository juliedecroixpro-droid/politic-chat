# 🧪 PoliticChat - Testing Guide

Complete guide to test all features of the application.

## 🚦 Pre-Test Checklist

- [ ] All services running (`./start.sh`)
- [ ] API keys configured in `backend/.env`
- [ ] Browser open at http://localhost:5173

## 1️⃣ Candidate Registration & Authentication

### Test Registration

1. Navigate to http://localhost:5173
2. Click "Register"
3. Fill in form:
   - **Name**: Jean Dupont
   - **Email**: jean@example.com
   - **Password**: test123456
   - **Election**: Municipales 2024
4. Click "Register"

**Expected Results:**
- ✅ Redirected to dashboard
- ✅ Welcome message shows "Welcome, Jean Dupont"
- ✅ Upload tab is active

### Test Login/Logout

1. Click "Logout"
2. Click "Login"
3. Enter credentials from registration
4. Click "Login"

**Expected Results:**
- ✅ Redirected to dashboard
- ✅ User data persists

### Test Invalid Authentication

1. Logout
2. Try logging in with wrong password
3. Try registering with same email

**Expected Results:**
- ✅ Clear error messages displayed
- ✅ No system crash

---

## 2️⃣ Program Upload & Processing

### Test Successful Upload

1. Login to dashboard
2. Navigate to "Program Upload" tab
3. Create a test document:
   - Use the provided `sample_program.pdf`
   - Or create a PDF with campaign content
4. Drag & drop file or click to upload
5. Click "Upload & Process Program"

**Expected Results:**
- ✅ Upload progress bar shows
- ✅ Processing message appears
- ✅ Success message: "Program uploaded and processed successfully! X sections indexed"
- ✅ Green banner appears with chat link
- ✅ File name shows in upload section

### Test Upload Validations

Try uploading:
- Text file (.txt) → Should reject
- Very large file (>50MB) → Should reject
- Empty PDF → Should handle gracefully

**Expected Results:**
- ✅ Clear validation errors
- ✅ No crashes

### Test Re-Upload

1. Upload a new document
2. Confirm it replaces the old one

**Expected Results:**
- ✅ New document replaces old
- ✅ Old embeddings are deleted
- ✅ Chat continues working with new program

---

## 3️⃣ Agent Configuration

### Test Agent Personality Configuration

1. Navigate to "Agent Config" tab
2. Change settings:
   - **Agent Name**: Marie
   - **Tone**: Formal
   - **Response Length**: Detailed
3. Click "Save Configuration"

**Expected Results:**
- ✅ Success message appears
- ✅ Preview updates in real-time
- ✅ Settings persist after page reload

### Test Configuration Variations

Try different combinations:
- Formal + Concise
- Accessible + Detailed
- Different agent names

**Expected Results:**
- ✅ All combinations save correctly
- ✅ Preview reflects changes

---

## 4️⃣ Public Chat Interface

### Get Chat URL

1. From dashboard, copy the chat URL
2. Open in new incognito window (to test rate limiting properly)
3. URL format: `http://localhost:5174/chat/jean-dupont`

### Test Basic Chat Functionality

**Scenario 1: Valid Question**
1. Type: "Quelles sont vos propositions pour l'environnement?"
2. Press Enter or click "Envoyer"

**Expected Results:**
- ✅ Question appears on right (blue bubble)
- ✅ Loading dots appear
- ✅ Answer appears on left (gray bubble)
- ✅ Answer cites page numbers from program
- ✅ Remaining messages count decreases (19/20)

**Scenario 2: Out-of-Scope Question**
1. Type: "Quel est votre film préféré?"

**Expected Results:**
- ✅ Response indicates topic not in program
- ✅ Suggests contacting candidate directly

**Scenario 3: Cached Response**
1. Ask the same question from Scenario 1 again

**Expected Results:**
- ✅ Near-instant response
- ✅ "⚡ Réponse instantanée" indicator appears

### Test Rate Limiting

1. Send 20 messages in the same chat window
2. Try to send message #21

**Expected Results:**
- ✅ After 20 messages, input is disabled
- ✅ Error message: "Vous avez atteint la limite quotidienne..."
- ✅ Counter shows 0/20

### Test Multiple IPs (Simulate Different Users)

1. Open chat in normal browser window
2. Open same chat in incognito window
3. Send messages from both

**Expected Results:**
- ✅ Each window has independent rate limit (20 messages each)
- ✅ Conversations don't mix

---

## 5️⃣ Analytics Dashboard

### Test Overview Metrics

1. After sending several chat messages, return to admin dashboard
2. Navigate to "Analytics" tab

**Expected Results:**
- ✅ Total Conversations count matches messages sent
- ✅ "Today" count shows recent messages
- ✅ Unique Users shows at least 1
- ✅ Avg Response Time shows reasonable number (<5000ms)
- ✅ Daily Cost shows small amount (<$0.10 for testing)

### Test Hourly Activity Chart

**Expected Results:**
- ✅ Chart shows bars for hours when messages were sent
- ✅ Chart is responsive

### Test Top Questions

**Expected Results:**
- ✅ Questions appear with count
- ✅ Most asked question is at top
- ✅ If same question asked multiple times, count increases

### Test CSV Export

1. Click "📥 Export CSV" button

**Expected Results:**
- ✅ CSV file downloads
- ✅ Contains all conversations
- ✅ Columns: Date, Question, Answer, Response Time
- ✅ Opens correctly in Excel/Google Sheets

---

## 6️⃣ Conversations Log

### Test Conversation Display

1. Navigate to "Conversations" tab

**Expected Results:**
- ✅ Shows all conversations in reverse chronological order
- ✅ Each shows: timestamp, question, answer, response time
- ✅ Formatted clearly
- ✅ Recent conversations appear first

---

## 7️⃣ Cost Monitoring

### Test Cost Tracking

1. Check Analytics dashboard after multiple conversations

**Expected Results:**
- ✅ Daily cost increments with each conversation
- ✅ Cost is reasonable (Claude Haiku is cheap: ~$0.001-0.003/conversation)
- ✅ Progress bar shows usage vs. $10 budget
- ✅ Cached responses don't add cost

### Simulate High Cost (Optional)

1. Ask many unique questions (to avoid cache)
2. Watch cost accumulate

**Expected Results:**
- ✅ Cost increases predictably
- ✅ No crashes even with many requests

---

## 8️⃣ Edge Cases & Error Handling

### Test Invalid Chat URLs

1. Visit: `http://localhost:5174/chat/nonexistent-candidate`

**Expected Results:**
- ✅ "Chat non disponible" error page
- ✅ Clear error message

### Test Candidate Without Program

1. Register new candidate but don't upload program
2. Try to access their chat URL

**Expected Results:**
- ✅ "Chat not available yet" message
- ✅ No crashes

### Test API Key Issues

1. Temporarily set invalid API key in `.env`
2. Restart backend
3. Try to send chat message

**Expected Results:**
- ✅ Graceful fallback or clear error
- ✅ Backend logs show error
- ✅ Frontend shows user-friendly message

### Test Concurrent Uploads

1. Start uploading a large PDF
2. Immediately try to upload another

**Expected Results:**
- ✅ Second upload waits or shows error
- ✅ No data corruption

---

## 9️⃣ Mobile Responsiveness

### Test on Mobile Viewport

1. Open browser DevTools (F12)
2. Toggle device emulation (Cmd+Shift+M / Ctrl+Shift+M)
3. Test iPhone, iPad, Android sizes

**Admin Portal:**
- ✅ Login/register forms readable
- ✅ Dashboard tabs stack vertically
- ✅ Charts resize properly
- ✅ Buttons are tappable

**Public Chat:**
- ✅ Chat interface fits screen
- ✅ Messages are readable
- ✅ Input doesn't get covered by keyboard
- ✅ Scrolling works smoothly

---

## 🔟 Performance Testing

### Test Document Processing Speed

1. Upload 100-page PDF
2. Time from upload to "processing complete"

**Expected Results:**
- ✅ Completes in 30-120 seconds (depending on machine)
- ✅ No timeout errors
- ✅ All pages processed

### Test Response Times

1. Ask 10 different questions
2. Note response times

**Expected Results:**
- ✅ First-time questions: 2-5 seconds
- ✅ Cached questions: <500ms
- ✅ No timeouts

---

## 1️⃣1️⃣ Multi-Candidate Isolation

### Test Data Isolation

1. Register Candidate A, upload Program A
2. Register Candidate B, upload Program B
3. Ask questions in both chats

**Expected Results:**
- ✅ Candidate A's chat only references Program A
- ✅ Candidate B's chat only references Program B
- ✅ No data leakage between candidates
- ✅ Analytics show separate stats

---

## ✅ Testing Checklist Summary

- [ ] Registration works
- [ ] Login/logout works
- [ ] Program upload succeeds
- [ ] Invalid files rejected
- [ ] Agent config saves
- [ ] Public chat loads
- [ ] Questions get answered
- [ ] Answers cite sources
- [ ] Rate limiting works (20 msg/day)
- [ ] Cached responses are instant
- [ ] Analytics display correctly
- [ ] CSV export works
- [ ] Conversations log shows all data
- [ ] Cost tracking works
- [ ] Error pages show properly
- [ ] Mobile layout works
- [ ] Multiple candidates isolated
- [ ] Performance is acceptable

---

## 🐛 Common Issues & Solutions

### Issue: "API key not found"
**Solution**: Check `backend/.env` has valid keys

### Issue: "Connection refused" on chat
**Solution**: Ensure backend is running (check `backend.log`)

### Issue: Upload fails silently
**Solution**: Check file size (<50MB) and format (PDF/DOCX)

### Issue: Responses are slow
**Solution**: 
- First request is always slower (cold start)
- Check internet connection (API calls)
- Check backend CPU usage

### Issue: Rate limit not resetting
**Solution**: Rate limit resets at midnight UTC (check system time)

### Issue: Analytics show 0
**Solution**: Send messages in public chat first, then refresh dashboard

---

## 📊 Expected Metrics After Full Test

After completing all tests, you should see approximately:

- **Total Conversations**: 25-30
- **Unique Users**: 2-3 (different browsers/incognito)
- **Daily Cost**: $0.05-0.15
- **Avg Response Time**: 2000-3000ms
- **Top Questions**: 2-3 questions asked multiple times
- **Cached Responses**: 20-30% hit rate

---

## 🎯 Production Testing Checklist

Before deploying to production:

- [ ] Test with real campaign documents (20-100 pages)
- [ ] Test under load (100+ messages/hour)
- [ ] Test all French language characters (é, è, à, etc.)
- [ ] Test on real mobile devices (not just emulator)
- [ ] Verify HTTPS certificates work
- [ ] Test password reset flow (if implemented)
- [ ] Verify email notifications (if implemented)
- [ ] Load test with artillery/k6
- [ ] Security audit (OWASP top 10)
- [ ] Backup and restore test

---

**Happy Testing! 🚀**

Report any bugs or unexpected behavior in the project issues.
