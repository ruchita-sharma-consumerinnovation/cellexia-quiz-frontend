import { getDbClient } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const sortOrder = searchParams.get('sort') === 'asc' ? 'ASC' : 'DESC' // Default to DESC

    const dbClient = getDbClient()

    if (id) {
      // Fetch specific quiz_data by ID
      const query = `SELECT * FROM quiz_responses WHERE id = $1;`
      const values = [id]
      const result = await dbClient.query(query, values)

      if (result.rows.length === 0) {
        return NextResponse.json({ message: 'Submission not found' }, { status: 404 })
      }

      return NextResponse.json(result.rows[0], { status: 200 })
    } else {
      // Fetch all quiz_data with sorting by created_at
      const query = `SELECT * FROM quiz_responses ORDER BY created_at ${sortOrder};`
      const result = await dbClient.query(query)

      return NextResponse.json(result.rows, { status: 200 })
    }
  } catch (error) {
    console.error('Error fetching quiz data:', error)
    return NextResponse.json({ message: 'Error fetching quiz data' }, { status: 500 })
  }
}
