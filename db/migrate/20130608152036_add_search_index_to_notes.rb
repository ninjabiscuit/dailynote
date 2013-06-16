class AddSearchIndexToNotes < ActiveRecord::Migration
  def up
    execute "create index notes_content on notes using gin(to_tsvector('english', content))"
  end

  def down
    execute "drop index notes_content"
  end
end
